import { Plus, SearchIcon } from "lucide-react";
import { Featured } from "~/components/interview/featured";
import { InterviewDialog } from "~/components/interview/interview-details-dialog";
import { DashboardLayout } from "~/components/layout/DashboardLayout"; 
import { DataTable } from "~/components/table";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import React from "react";  

const testFeature = {
  "id": "test-1",
  "name": "Amazon Technical Interview",
  "description": "Amazon Technical Interview focused on data structures and algorithms.",
  "duration": "20-30 minutes",
  "characteristics": [
    "Hard",
    "Technical Focused",
    "Foundations",
    "Neutral Feedback"
  ],
  "companySimilarTo": [
    "Google",
    "Microsoft",
    "Apple"
  ],
  "interviewType": "Technical",
  "botIconUrl": "/aggresive.svg",
  "vapiBotId": "test-1",
  "backgroundUrl": "https://images.unsplash.com/photo-1704204656144-3dd12c110dd8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW1hem9uJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D",
};

export default function Home(){ 
  const [interviewDetailsModal, setInterviewDetailsModal] = React.useState<boolean>(false);

  return (
    <DashboardLayout> 
      <div className="flex flex-1 flex-col gap-4 px-10 pt-0 mb-10">  
        <div className="flex flex-row justify-between items-center w-full">  
          <div className="relative flex ml-4">
            <Input placeholder="Search..." className="w-[300px] rounded-full bg-secondary p-5"  />
            <SearchIcon className="relative right-8 top-3 w-4 h-4"/>
          </div> 
          <Button className="mr-10 rounded-full"> 
            <Plus className="w-4 h-4 mr-2" />
            Add Interview
          </Button>
        </div>
        <div className="flex flex-col gap-4 pt-10 ml-2"> 
          <h2 className="text-3xl leading-tight font-med text-pretty"> Featured Interviews </h2>
          <div className="flex flex-row gap-8 pt-4 flex-wrap w-[80%]"> 
            {
              new Array(8).fill(0).map((_, i) => (  
                <Featured 
                  key={i}
                  onClick={() => {
                    setInterviewDetailsModal(true); 
                  }}
                /> 
              ))
            } 
          </div> 
        </div>
        <div className="flex flex-col gap-4 pt-10 ml-2"> 
          <h2 className="text-3xl leading-tight font-med text-pretty"> Interviewers </h2>
          <div className="flex flex-row gap-8 pt-4 flex-wrap w-[97%]"> 
            <DataTable
              columns={[
                { accessorKey: "name", header: "Interviewer" },
                { accessorKey: "email", header: "Characteristic" },
                { accessorKey: "date", header: "Focus" }, 
              ]}
              data={[
                { 
                  name: "John Doe",
                  email: "johndoe@gmail.com",
                  date: "2023-10-01",
                  time: "10:00 AM",
                  status: "Scheduled",
                },
                { 
                  name: "John Doe",
                  email: "johndoe@gmail.com",
                  date: "2023-10-01",
                  time: "10:00 AM",
                  status: "Scheduled",
                },
                { 
                  name: "John Doe",
                  email: "johndoe@gmail.com",
                  date: "2023-10-01",
                  time: "10:00 AM",
                  status: "Scheduled",
                },
                { 
                  name: "John Doe",
                  email: "johndoe@gmail.com",
                  date: "2023-10-01",
                  time: "10:00 AM",
                  status: "Scheduled",
                },
                { 
                  name: "John Doe",
                  email: "johndoe@gmail.com",
                  date: "2023-10-01",
                  time: "10:00 AM",
                  status: "Scheduled",
                },
                { 
                  name: "John Doe",
                  email: "johndoe@gmail.com",
                  date: "2023-10-01",
                  time: "10:00 AM",
                  status: "Scheduled",
                },
                { 
                  name: "John Doe",
                  email: "johndoe@gmail.com",
                  date: "2023-10-01",
                  time: "10:00 AM",
                  status: "Scheduled",
                },
                { 
                  name: "John Doe",
                  email: "johndoe@gmail.com",
                  date: "2023-10-01",
                  time: "10:00 AM",
                  status: "Scheduled",
                },
              ]}
            />
          </div>
        </div>
      </div>
      <InterviewDialog 
        interviewDetails={testFeature}
        open={interviewDetailsModal} 
        setOpen={setInterviewDetailsModal} 
      />
    </DashboardLayout>
  );
}; 