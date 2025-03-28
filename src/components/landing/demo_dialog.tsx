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
import { Avatar } from "@radix-ui/react-avatar";

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
  } = useDemo(); 

  return <Dialog open={open} onOpenChange={(open) => setOpen(open)} > 
    <DialogContent className="sm:max-w-[600px] border-2 border-[#1a1a1a] rounded-lg [&>button]:hidden">
      <DialogHeader >
        <DialogTitle className="text-center text-2xl font-medium flex flex-row items-center justify-center w-full">
          <p className="mx-auto"> Incoming Call  </p> 
          <SignalIcon className="text-green-500" /> 
        </DialogTitle>
        <hr /> 
        <DialogDescription className="text-start text-sm text-muted-foreground flex-wrap">  
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select an interviewer" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel> Interviewers</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Avatar />

          {
            callOnGoing && <Typewriter 
              text={initialMessage}
              speed={20}
              delay={100}
              onComplete={() => {
                console.log("Done");
              }}
              className="text-md font-medium text-white" 
            />
          }

        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col h-full">
        <div className="flex flex-row w-full justify-around" >   
          <Button onClick={endWebCall} className="text-white font-medium leading-tight bg-[#fd695e] hover:bg-red-500 text-2xl px-8 py-6 rounded-xl">  
            <Phone className="w-44 h-w-44 text-white fill-white mx-auto cursor-pointer rotate-[135deg]" /> Reject
          </Button>  
          <Button onClick={startWebCall} className="text-white bg-[#52b559] hover:bg-green-500 text-2xl px-8 py-6 rounded-xl font-medium leading-tight">
            <Phone className="w-44 h-w-44 text-white fill-white mx-auto cursor-pointer" /> Accept
          </Button>  
        </div> 
      </div> 
    </DialogContent>
  </Dialog>;
};
