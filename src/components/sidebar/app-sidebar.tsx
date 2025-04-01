 

import * as React from "react";
import { 
  BookOpen,
  Bot, 
  Settings2,
  SquareTerminal,
} from "lucide-react"; 
import { NavMain } from "~/components/sidebar/nav-main"; 
import { NavUser } from "~/components/sidebar/nav-user";
import { TeamSwitcher } from "~/components/sidebar/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar"; 
import { useSession } from "next-auth/react"; 

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: userData } = useSession();

  const data = {
    user: {
      name: "shadcn",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Interviews",
        url: "/dashboard/interviews",
        icon: SquareTerminal,
        isActive: true, 
      },
      {
        title: "History",
        url: "/dashboard/history",
        icon: Bot, 
      },
      {
        title: "Account",
        url: "/dashboard/account",
        icon: BookOpen, 
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings2, 
      },
    ], 
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} /> 
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={
          data ? {
            name: userData?.user.name ?? "",
            email: userData?.user.email ?? "",
            avatar: userData?.user.image ?? "",
          } : {
            name: "Guest",
            email: "",
            avatar: "",
          }
        } />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
