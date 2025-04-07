import { SidebarProvider, SidebarInset } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/sidebar/app-sidebar"; 
import { PagePath } from "./page-path";

export const DashboardLayout: React.FC<{
    children: React.ReactNode;
    open?: boolean;
}> = ({ children, open }) => {
  return <SidebarProvider>
    <AppSidebar open={open} />
    <SidebarInset> 
      <PagePath />
      {children}
    </SidebarInset>
  </SidebarProvider>;
};