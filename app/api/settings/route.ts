import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { updateUserProfile, updateUserPassword, deleteUserAccount } from "@/actions/user-actions";
import { checkRateLimit } from "@/lib/settings-utils";

export async function PUT(request: NextRequest) {
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      username: string;
      email: string;
    };

    // Rate limiting
    const clientIp = request.ip || request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`settings-${decoded.id}-${clientIp}`, 5, 60000)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case "updateProfile":
        if (!data.username || !data.email) {
          return NextResponse.json(
            { success: false, error: "Username and email are required" },
            { status: 400 }
          );
        }
        const profileResult = await updateUserProfile(
          decoded.id,
          data.username,
          data.email
        );
        return NextResponse.json(profileResult);

      case "updatePassword":
        if (!data.currentPassword || !data.newPassword) {
          return NextResponse.json(
            { success: false, error: "Current password and new password are required" },
            { status: 400 }
          );
        }
        const passwordResult = await updateUserPassword(
          decoded.id,
          data.currentPassword,
          data.newPassword
        );
        return NextResponse.json(passwordResult);

      default:
        return NextResponse.json(
          { success: false, error: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Settings API error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const token = cookies().get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      username: string;
      email: string;
    };

    // Rate limiting for delete account (more restrictive)
    const clientIp = request.ip || request.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(`delete-${decoded.id}-${clientIp}`, 2, 300000)) { // 2 attempts per 5 minutes
      return NextResponse.json(
        { success: false, error: "Too many delete attempts. Please try again later." },
        { status: 429 }
      );
    }

    const result = await deleteUserAccount(decoded.id);
    
    if (result.success) {
      // Clear the auth cookie
      const response = NextResponse.json(result);
      response.cookies.delete("token");
      return response;
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Delete account error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
