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
import { Phone, SignalIcon } from "lucide-react"; 
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
import { Mock_Interviewers } from "~/utils/constants";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import { motion } from "framer-motion"; 

const initialMessage = "Alright, let's go through a problem together. Imagine I give you a positive whole number, which we’ll call 'n'. Your task is to create a list of words, where each word follows these rules:  If the position in the list is divisible by both three and five, the word should be \"FizzBuzz\".  If the position is divisible only by three, the word should be \"Fizz\".  If the position is divisible only by five, the word should be \"Buzz\".  If none of these conditions apply, the word should just be the position itself, spoken as a word instead of a number.  For example, if 'n' is five, the result would be: the word \"one\", the word \"two\", the word \"Fizz\", the word \"four\", and the word \"Buzz\". Feel free to repeat it back or ask any clarifying questions before you start explaining your approach."; 
 
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
    setCallOnGoing
  } = useDemo(); 

  return <Dialog open={open} onOpenChange={(open) => {
    setOpen(open);
    if(!open) {
      setCallOnGoing(false);
    }
  }} > 
    <DialogContent className={`${callOnGoing ? "sm:max-w-[800px]" : "sm:max-w-[500px]"} border-2 border-[#1a1a1a] rounded-lg [&>button]:hidden transition-all duration-75 ease-in-out`}>
      <DialogHeader >
        <DialogTitle className="text-center text-2xl font-medium flex flex-row items-center justify-center w-full">
          <p className="mx-auto"> Incoming Call  </p> 
          <SignalIcon className="text-green-500" /> 
        </DialogTitle>
        <hr /> 
        <DialogDescription className="flex flex-col justify-center items-center">   
          <div className="flex flex-row items-center justify-center my-2 gap-10"> 
            <div className="flex flex-col items-center justify-center"> 
              <div className="flex flex-col items-center justify-center my-4">  
                <Avatar className="w-24 h-24 mt-4 mb-2">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-lg font-semibold text-center">{interviewer?.name}</p>
                <p className="text-sm text-center text-muted-foreground">{interviewer?.description}</p>
              </div>
              <div className="flex flex-col items-center justify-center my-2">  
                <Select value={interviewer?.name} disabled={callOnGoing}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select an interviewer" />
                  </SelectTrigger>
                  <SelectContent className="w-[180px]">
                    <SelectGroup>
                      <SelectLabel> Interviewers</SelectLabel>
                      {Mock_Interviewers.map((a, index) => (
                        <SelectItem key={index} value={a.name} onClick={() => setInterviewer(a)}> 
                          {a.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div> 
            </div>
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
                  delay={100}
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
              <Button onClick={endWebCall} className="text-white bg-[#fd695e] hover:bg-red-500 text-xl px-8 py-6 rounded-xl font-medium leading-tight">  
                <Phone className="w-44 h-w-44 text-white fill-white mx-auto cursor-pointer rotate-[135deg] mr-1" /> End Call
              </Button>
              :
              <>
                <Button onClick={endWebCall} className="text-white font-medium leading-tight bg-[#fd695e] hover:bg-red-500 text-xl px-8 py-6 rounded-xl">  
                  <Phone className="w-44 h-w-44 text-white fill-white mx-auto cursor-pointer rotate-[135deg] mr-1" /> Reject
                </Button>  
                <Button onClick={startWebCall} className="text-white bg-[#52b559] hover:bg-green-500 text-xl px-8 py-6 rounded-xl font-medium leading-tight">
                  <Phone className="w-44 h-w-44 text-white fill-white mx-auto cursor-pointer mr-1" /> Accept
                </Button>  
              </>
          } 
        </div> 
      </div> 
    </DialogContent>
  </Dialog>;
};
