import React from "react"; 
import useDemo from "~/hooks/use-demo";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle, 
} from "../ui/dialog"; 
import { Mic, PhoneOff } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Typewriter } from "../text/typewriter";

const initialMessage = "Alright, let's go through a problem together. Imagine I give you a positive whole number, which we’ll call 'n'. Your task is to create a list of words, where each word follows these rules:  If the position in the list is divisible by both three and five, the word should be \"FizzBuzz\".  If the position is divisible only by three, the word should be \"Fizz\".  If the position is divisible only by five, the word should be \"Buzz\".  If none of these conditions apply, the word should just be the position itself, spoken as a word instead of a number.  For example, if 'n' is five, the result would be: the word \"one\", the word \"two\", the word \"Fizz\", the word \"four\", and the word \"Buzz\". Feel free to repeat it back or ask any clarifying questions before you start explaining your approach."; 
 
export const DemoDialog: React.FC<{
    open: boolean, 
    setOpen: (open: boolean) => void
}> = ({
  open,
  setOpen
}) => { 
  const {startWebCall, endWebCall} = useDemo(); 

  return <Dialog open={open} onOpenChange={(open) => setOpen(open)}> 
    <DialogContent className="sm:max-w-[600px] border-2 border-gray-800 rounded-lg">
      <DialogHeader >
        <DialogTitle className="text-center text-2xl font-medium leading-tight">Mock Interivew</DialogTitle>
        <DialogDescription className="text-start text-sm text-muted-foreground flex-wrap">
          <Typewriter 
            text={initialMessage}
            speed={20}
            delay={100}
            onComplete={() => {
              console.log("DOne");
            }}
            className="text-xl font-medium" 
          />
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col h-full">
        <div className="flex flex-row" > 
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Mic className="w-16 h-16 text-blue-600 mx-auto cursor-pointer" onClick={startWebCall} /> 
              </TooltipTrigger>
              <TooltipContent side="bottom" align="center">
                <div className="p-4 text-sm text-black bg-white rounded-lg">
                Start interview
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PhoneOff className="w-16 h-16 text-red-600 mx-auto cursor-pointer" onClick={endWebCall} /> 
              </TooltipTrigger>
              <TooltipContent side="bottom" align="center">
                <div className="p-4 text-sm text-black bg-white rounded-lg">
                End interview
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div> 
      </div>
      <DialogFooter>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button >Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>;
};
