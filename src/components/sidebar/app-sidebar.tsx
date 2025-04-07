 

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
  useSidebar,
} from "~/components/ui/sidebar"; 
import { useSession } from "next-auth/react"; 

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar> & { open?: boolean }) {
  const { data: userData } = useSession();
  const {setOpen} = useSidebar();
  const data = {
    user: {
      name: "Arnold",
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
  
  const setOpenOnFirstRender = React.useRef(false); 
  React.useEffect(() => {
    if (props.open && !setOpenOnFirstRender.current) {
      setOpen(true);
      setOpenOnFirstRender.current = true;
    }  
  }, [setOpen]);

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
