import { useRouter } from "next/router";
import React from "react"; 
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { SidebarTrigger } from "~/components/ui/sidebar"; 
import { useHydrate } from "~/hooks/use-hydrate";

export const PagePath = () => {
  const {pathname} = useRouter();
  const path = pathname.split("/").slice(1).join(" > ");
  const pathArray = path.split(" > "); 

  const hydrated = useHydrate();
  if (!hydrated) return <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    <div className="flex items-center gap-2 px-4" /> </header>;  
  
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4"> 
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {
              pathArray.map((item, index) => {
                if(item === "[id]") return null;  
                let isLast = index === pathArray.length - 1;
                isLast =  pathArray[index + 1] === "[id]";
                const href = "/" + pathArray.slice(0, index + 1).join("/");
                return (
                  <BreadcrumbItem key={item} className={isLast ? "font-bold" : ""}>
                    <BreadcrumbLink href={isLast ? undefined : href} className="text-muted-foreground hover:text-primary hover:underline">
                      {item.toUpperCase()}
                    </BreadcrumbLink> 
                    {!isLast && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                );
              })
            } 
          </BreadcrumbList>
        </Breadcrumb> 
      </div>
    </header>
  );
};