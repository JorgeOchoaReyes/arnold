import { Loader2, SearchIcon } from "lucide-react"; 
import { DashboardLayout } from "~/components/layout/DashboardLayout"; 
import { DataTable } from "~/components/table"; 
import { Input } from "~/components/ui/input";
import { api } from "~/utils/api";

export default function Home(){   
  const records = api.interview.getInterviewRecords.useQuery();

  return (
    <DashboardLayout> 
      <div className="flex flex-1 flex-col gap-4 px-10 pt-0">   
        <div className="flex flex-col w-[90%]"> 
          <div className="flex flex-row justify-between items-center w-full ">  
            <h2 className="text-3xl leading-tight font-med text-pretty"> Interview Records </h2>  
            <div className="flex">
              <Input placeholder="Search..." className="w-[300px] rounded-full bg-secondary p-5"  />
              <SearchIcon className="relative right-8 top-3 w-4 h-4"/>
            </div>  
          </div> 
          <div className="flex justify-cente items-center flex-row pt-4 flex-wrap w-[100%]"> 
            {
              records.isLoading ? 
                <div className="flex w-full justify-center items-center h-[80vh]"> 
                  <Loader2 className="animate-spin" />
                </div> : 
                records.isError ?
                  <div className="text-red-500">Error loading records</div> : 
                  <DataTable
                    columns={[
                      { accessorKey: "name", header: "Interview" }, 
                      { accessorKey: "date", header: "Focus" }, 
                    ]}
                    data={records?.data?.map((r) => {
                      return {
                        id: r.id, 
                        name: r.name,
                        date: r.startTime ? new Date(r.startTime).toLocaleDateString() : "N/A",
                      };
                    }) ?? []}
                  />
            }
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}; 