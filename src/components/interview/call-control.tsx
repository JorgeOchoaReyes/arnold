import { Slider } from "~/components/ui/slider";
import { MicOff,  PhoneCall, PhoneOff, Volume } from "lucide-react";
import type React from "react"; 
import { Button } from "~/components/ui/button"; 
import { Toggle } from "~/components/ui/toggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { Typewriter } from "../text/typewriter";

export const CallControl: React.FC<{
  onClickStart: () => Promise<void>,
  onClickEnd: () => Promise<void>,
  onClickMute: () => Promise<void>,
  onChangeVolume: (v: number) => void, 
  callOnGoing: boolean,
  mute: boolean,
  volume: number,
  callerTalking: boolean,
}> = ({
  callOnGoing,
  onClickStart,
  onClickEnd,
  onClickMute,
  onChangeVolume, 
  mute,
  volume,
  callerTalking
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-lg justify-center items-center mt-10"> 
      <Typewriter 
        text={!callOnGoing ? "Waiting to start call" : callerTalking ? "Interviewer is speaking" : "You are speaking"}
        className={`text-2xl font-bold ${!callOnGoing ? "text-white" : callerTalking ? "text-red-500" : "text-green-500"}`}
      />
      <div className="flex flex-row items-center justify-center h-full bg-primary w-1/6 rounded-full p-2 relative">   
        <div style={{
          transition: "all 0.3s ease-in-out",
          backgroundColor: callOnGoing ? "#f87171" : "#a7a7a7",
        }} className="h-5 w-5  rounded-full absolute left-5" />    
        {
          !callOnGoing ?
            <Button variant={"ghost"} className="hover:bg-slate-300 ml-8" onClick={async () => await onClickStart()} > 
              <PhoneCall className=" text-black"/>  
            </Button>  :
            <Button variant={"ghost"} className="hover:bg-slate-300 ml-8" onClick={async () => await onClickEnd()} > 
              <PhoneOff className=" text-black"/>  
            </Button>  
        } 
        <Toggle pressed={mute} onClick={async () => await onClickMute()}  > 
          <MicOff className={`${mute ? "text-white" : "text-black"} transition-all hover:text-white`} /> 
        </Toggle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="hover:bg-slate-300" >
              <Volume className=" text-black"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-2">
            <DropdownMenuLabel>Volume {volume}</DropdownMenuLabel>
            <DropdownMenuSeparator /> 
            <Slider 
              value={[volume]}
              onValueChange={(v) => {
                onChangeVolume(v[0] ?? 0); 
              }}
              onValueCommit={(v) => {
                onChangeVolume(v[0] ?? 0); 
              }}
              max={100}
              step={1} 
            /> 
          </DropdownMenuContent>
        </DropdownMenu>
      </div> 
    </div>
  );
};
