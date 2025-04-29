import React from "react";  
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle, 
} from "../ui/dialog";  
import { type Interview } from "@prisma/client";
import { Typewriter } from "../text/typewriter";  
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { coloring, contrastColor, companyColorsAndIcons } from "~/utils/help";
import { Button } from "../ui/button";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";

export const InterviewDialog: React.FC<{
    open: boolean, 
    setOpen: (open: boolean) => void,
    interviewDetails: Interview | null, 
}> = ({
  open,
  setOpen,
  interviewDetails
}) => {  
  const createinterview = api.interview.startInterviewRecord.useMutation();
  const router = useRouter();

  const startInterview = async () => {
    if(!interviewDetails) {
      alert("No interview details found");
      return;
    }
    const interviewId = await createinterview.mutateAsync({
      interview: interviewDetails,
    });
    if(interviewId) { 
      setOpen(false); 
      await router.push(`/dashboard/interviews/${interviewId}`);
    } else {
      alert("Error starting interview");
    }
  };

  return <Dialog   
    open={open}
    onOpenChange={(open) => {
      setOpen(open); 
    }} 
  > 
    <DialogContent className={"sm:max-w-[500px] rounded-lg [&>button]:hidden transition-all duration-75 ease-in-out"}>
      <DialogHeader >
        <DialogTitle className="flex flex-row items-center justify-center w-full gap-5">
          <p className="text-center text-2xl font-medium text-white"> {interviewDetails?.name ?? "Interview Details"}</p>                  
          <Avatar className="w-10 h-auto mb-3">
            <AvatarImage src={interviewDetails?.botIconUrl ?? ""} alt={interviewDetails?.name} /> 
          </Avatar>
        </DialogTitle>
        <hr /> 
        <DialogDescription className="flex flex-col justify-center items-center">   
          <div className="flex flex-col items-start justify-center my-2"> 
            <p className="text-sm pb-3 text-muted-foreground text-center w-[90%] flex flex-wrap"> 
            Characteristsics
            </p>  
            <Typewriter
              text={interviewDetails?.description ?? "Interview Details"}
              speed={10} 
              className="text-white"
            /> 
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col h-full justify-center items-center">
        <p className="text-sm pt-3 text-muted-foreground text-center w-[90%] flex flex-wrap"> 
            Characteristsics
        </p>
        <div className="flex flex-row gap-1 pt-2 pb-2 flex-wrap w-[90%]"> 
          {
            interviewDetails?.characteristics.map((characteristic, index) => { 
              const bgColor = coloring[characteristic.toLowerCase() as keyof typeof coloring] || "#1e293b";
              return <span key={index} 
                style={{
                  backgroundColor: bgColor,
                  color: contrastColor(bgColor),
                }}
                className={"text-[12px] text-pretty rounded-full  px-2 py-1"}>{characteristic}</span>; 
            })
          }
        </div>
        <p className="text-sm pt-3 text-muted-foreground text-center w-[90%] flex flex-wrap"> 
            Copmanies similar to
        </p>
        <div className="flex flex-row gap-1 pt-2 pb-2 flex-wrap w-[90%]"> 
          {
            interviewDetails?.companySimilarTo.map((company, index) => { 
              const bgColor = companyColorsAndIcons[company.toLowerCase() as keyof typeof companyColorsAndIcons]?.color || "#1e293b";
              return <span key={index+"company"} 
                style={{
                  backgroundColor: bgColor,
                  color: contrastColor(bgColor),
                }}
                className={"text-[12px] text-pretty rounded-full font-semibold px-2 py-1"}>{company}</span>; 
            })
          }
        </div>
        <hr /> 
        <div className="flex flex-row gap-2 pt-2 pb-2 flex-wrap w-[90%] justify-end"> 
          <Button variant={"destructive"} onClick={() => setOpen(false)} className="bg-red-500 hover:bg-red-600 text-white">
            Cancel
          </Button>
          <Button onClick={startInterview} className=""> 
            {!createinterview.isPending ? "Start Interview! 🚀" : <Loader2 className="animate-spin" />}
          </Button>
        </div>
      </div> 
    </DialogContent>
  </Dialog>;
};
