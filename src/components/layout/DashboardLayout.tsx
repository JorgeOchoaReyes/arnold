import { SidebarProvider, SidebarInset } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/sidebar/app-sidebar"; 
import { PagePath } from "../path/page-path";

export const DashboardLayout: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
  return <SidebarProvider>
    <AppSidebar />
    <SidebarInset> 
      <PagePath />
      {children}
    </SidebarInset>
  </SidebarProvider>;
};