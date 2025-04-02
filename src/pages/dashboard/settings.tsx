import { DashboardLayout } from "~/components/layout/DashboardLayout"; 
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ProfileForm } from "~/components/settings/profileForm";
import { Loader2 } from "lucide-react";
import { api } from "~/utils/api"; 

export default function Home(){   
  const { data: session } = useSession();
  const getResumeLink = api.user.getResumeLink.useQuery(); 

  if (!session || getResumeLink.isLoading) {
    return <DashboardLayout> 
      <div className="flex flex-1 items-center justify-center"> <Loader2 className="animate-spin" /> </div>
    </DashboardLayout>;
  }
  
  if (!session) {
    redirect("/api/auth/signin");
  }
  return (
    <DashboardLayout> 
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0"> 
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">Update your account information</p>
          </div>
          <ProfileForm user={session.user} resume={getResumeLink.data ?? null} /> 
        </div>
      </div>
    </DashboardLayout>
  );
}; 

