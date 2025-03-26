import { getSession } from '@auth0/nextjs-auth0';

import { LogOutIcon } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export async function NavUser() {
  const session = await getSession();
  const user = session?.user;

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex items-center justify-between">
        <SidebarMenuButton size="lg" className="basis-10/12">
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user?.name}</span>
            <span className="truncate text-xs text-muted-foreground">
              {user?.email}
            </span>
          </div>
        </SidebarMenuButton>
        <SidebarMenuButton className="basis-2/12 flex items-center justify-center">
          <a href="/api/auth/logout" className="text-muted-foreground hover:text-primary">
            <LogOutIcon className="size-4" />
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
