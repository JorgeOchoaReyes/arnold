import React from "react"; 
import useDemo from "~/hooks/use-demo";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle, 
} from "../ui/dialog"; 
import { Loader2, Phone, SignalIcon } from "lucide-react"; 
import { Typewriter } from "../text/typewriter"; 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"; 
import { Mock_Interviewers } from "~/utils/help";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { motion } from "framer-motion"; 

const initialMessage = "Let's solve a problem together. Given a positive whole number 'n', create a list of words following these rules: If the position is divisible by 3 and 5, use 'FizzBuzz'. If only by 3, use 'Fizz'. If only by 5, use 'Buzz'. Otherwise, use the position as a word. For example, if 'n' is 5, the result would be: 'one', 'two', 'Fizz', 'four', 'Buzz'. Let me know if you need clarification before explaining your approach."; 

export const DemoDialog: React.FC<{
    open: boolean, 
    setOpen: (open: boolean) => void
}> = ({
  open,
  setOpen
}) => { 
  const { 
    startWebCall, 
    endWebCall,
    interviewer,
    setInterviewer, 
    callOnGoing, 
    setCallOnGoing,
    resultsOfLatestCall,
    countDown,
    loading,  
  } = useDemo(); 

  return <Dialog open={open} onOpenChange={(open) => {
    setOpen(open);
    if(!open) {
      setCallOnGoing(false);
    }
  }} > 
    <DialogContent className={`${(callOnGoing || resultsOfLatestCall?.summary) ? "sm:max-w-[800px]" : "sm:max-w-[500px]"} border-2 border-[#1a1a1a] rounded-lg [&>button]:hidden transition-all duration-75 ease-in-out`}>
      <DialogHeader >
        <DialogTitle className="text-center text-2xl font-medium flex flex-row items-center justify-center w-full">
          <p className="mx-auto"> Incoming Call </p> 
          <SignalIcon className="text-green-500" /> 
        </DialogTitle>
        <hr /> 
        <DialogDescription className="flex flex-col justify-center items-center">   
          <div className="flex flex-row items-center justify-center my-2 gap-10"> 
            <div className="flex flex-col items-center justify-center"> 
              <div className="flex flex-col items-center justify-center my-4">  
                <Avatar className="w-24 h-24 mt-4 mb-2">
                  <AvatarImage src={interviewer?.src} alt={interviewer?.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-lg font-semibold text-center">{interviewer?.name}</p>
                <p className="text-sm text-center text-muted-foreground">{interviewer?.description}</p>
              </div>
              <div className="flex flex-col items-center justify-center my-2">  
                <Select value={interviewer?.name} disabled={callOnGoing} onValueChange={(value) => {
                  const selectedInterviewer = Mock_Interviewers.find((a) => a.name === value);
                  if(selectedInterviewer) {
                    setInterviewer(selectedInterviewer);
                  }
                }}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select an interviewer" />
                  </SelectTrigger>
                  <SelectContent className="w-[180px]">
                    <SelectGroup>
                      <SelectLabel> Interviewers </SelectLabel>
                      {Mock_Interviewers.map((a, index) => (
                        <SelectItem key={index} value={a.name} className="cursor-pointer hover:bg-[#1a1a1a]"> 
                          {a.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div> 
            </div>
            {
              loading ? <Loader2 className="w-16 h-16 animate-spin text-gray-200" /> :
                resultsOfLatestCall?.summary && !callOnGoing && 
              <motion.div className="flex flex-col items-start justify-start w-96 bg-purple-600 rounded-lg p-4 border-2 border-[#1a1a1a]"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              >   
                <p className="text-lg font-medium leading-tight text-start text-white">Review: </p> 
                <p className="text-md font-medium leading-tight text-start text-white">{resultsOfLatestCall?.summary}</p> 
              </motion.div> 
            }
            {
              callOnGoing &&  
              <motion.div className="flex flex-col items-center justify-center w-96 bg-blue-600 rounded-lg p-4"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
              > 
                <Typewriter 
                  text={initialMessage}
                  speed={10}
                  delay={1}
                  onComplete={() => {
                    console.log("Done");
                  }}
                  className="text-md font-medium text-white w-auto" 
                />
              </motion.div>
            }  
          </div>
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col h-full">
        <div className="flex flex-row w-full justify-around">    
          {
            callOnGoing ? 
              <Button onClick={async () => await endWebCall()} className="text-white bg-[#fd695e] hover:bg-red-500 text-xl px-8 py-6 rounded-xl font-medium leading-tight">  
                <Phone className="w-44 h-w-44 text-white fill-white mx-auto cursor-pointer rotate-[135deg] mr-1" /> End Call - {callOnGoing ? `${countDown} secs` : ""}
              </Button>
              :
              <>
                <Button onClick={async () => { 
                  setOpen(false); 
                }} className="text-white font-medium leading-tight bg-[#fd695e] hover:bg-red-500 text-xl px-8 py-6 rounded-xl">  
                  <Phone className="w-44 h-w-44 text-white fill-white mx-auto cursor-pointer rotate-[135deg] mr-1" /> Reject
                </Button>  
                <Button onClick={async () => {
                  await startWebCall();  
                }} className="text-white bg-[#52b559] hover:bg-green-500 text-xl px-8 py-6 rounded-xl font-medium leading-tight">
                  <Phone className="w-44 h-w-44 text-white fill-white mx-auto cursor-pointer mr-1" /> {resultsOfLatestCall?.summary ? "Start New Call" : "Accept"}
                </Button>  
              </>
          } 
        </div>  
      </div> 
    </DialogContent>
  </Dialog>;
};
