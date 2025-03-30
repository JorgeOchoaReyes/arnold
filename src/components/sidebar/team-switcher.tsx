"use client";

import * as React from "react"; 
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, 
} from "~/components/ui/sidebar";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ReactNode 
  }[]
}) { 
  const [activeTeam, ] = React.useState(teams[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem> 
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground 0 h-fit"
        > 
          <div className="flex flex-col justify-center items-start"> 
            {activeTeam?.logo}  
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
