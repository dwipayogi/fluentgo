import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Save, Trash2 } from "lucide-react";

export default function SettingPage() {
  return (
    <main className="p-6">
      <div className="space-y-6">
        {/* Profile Information */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-50">Profile Information</CardTitle>
            <CardDescription className="text-zinc-400">
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-50">
                Username
              </Label>
              <Input
                id="name"
                className="bg-zinc-800 border-zinc-700 text-zinc-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-50">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="bg-zinc-800 border-zinc-700 text-zinc-50"
              />
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-50">Account Settings</CardTitle>
            <CardDescription className="text-zinc-400">
              Manage your account and subscription
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-zinc-50">
                Current Password
              </Label>
              <Input
                id="current-password"
                type="password"
                className="bg-zinc-800 border-zinc-700 text-zinc-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-zinc-50">
                New Password
              </Label>
              <Input
                id="new-password"
                type="password"
                className="bg-zinc-800 border-zinc-700 text-zinc-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-zinc-50">
                Confirm New Password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                className="bg-zinc-800 border-zinc-700 text-zinc-50"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="bg-zinc-800 text-zinc-50 hover:bg-zinc-700">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>

        {/* Delete Account */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-50 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              Delete Account
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Permanently delete your account and all data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400 mb-4">
              This action cannot be undone. All your account data, learning
              progress, and history will be permanently deleted.
            </p>
            <Button
              variant="destructive"
              className="bg-red-900 hover:bg-red-800 text-zinc-50"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
