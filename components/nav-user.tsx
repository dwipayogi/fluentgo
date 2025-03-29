"use client";
import { LogOutIcon } from "lucide-react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export function NavUser() {
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });
    const data = await res.json();
    if (res.ok) {
      console.log(data.message); // Logout successful
      router.push("/"); // Redirect to sign-in page
    } else {
      console.error(data.message); // Handle error
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-between">
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-medium">{user?.username}</span>
          <span className="truncate text-xs text-muted-foreground">
            {user?.email}
          </span>
        </div>
        <Button
          variant="destructive"
          className="basis-2/12 flex items-center justify-center"
          onClick={handleLogout}
        >
          <LogOutIcon className="size-4" />
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
