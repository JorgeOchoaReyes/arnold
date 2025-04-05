import { DashboardLayout } from "~/components/layout/DashboardLayout"; 
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home(){
  const router = useRouter();

  // Temnp for now
  useEffect(() => {
    router.push("/dashboard/interviews").then(() => {
      console.log("Redirected to /dashboard/interviews");
    }).catch((error) => {
      console.error("Failed to redirect:", error);
    });
  }, []);

  return (
    <DashboardLayout> 
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0"> 
      </div>
    </DashboardLayout>
  );
}; 