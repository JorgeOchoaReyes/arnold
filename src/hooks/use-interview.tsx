/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useRef } from "react"; 
import Vapi from "@vapi-ai/web"; 
import { api } from "~/utils/api";
import { type Call } from "@vapi-ai/web/dist/api"; 

export default function useInterview(interviewerId: string) {
  if(!process.env.NEXT_PUBLIC_PUBLIC_VAPI_API || process.env.NEXT_PUBLIC_ASSISTANT_ID === "") {
    throw new Error("[ERROR]: VAPI_API_KEY not found or assistant not found");
  }
  const interviewDetails = api.interview.getInterviewRecordById.useQuery({
    id: interviewerId ?? ""
  }); 
  const [usersNotes, setUsersNotes] = React.useState<string>(""); 
  const callOnGoing = useRef(false);
  const apiKey = process.env.NEXT_PUBLIC_PUBLIC_VAPI_API ?? "";
  const vapi = React.useMemo(() => new Vapi(apiKey, undefined, {alwaysIncludeMicInPermissionPrompt: true}), []); 
  const [callVapi, setCallVapi] = React.useState<Call | null>(null);  
  const [inteviewerSpeaking, setInterviewerSpeaking] = React.useState(false); 
  const [volume, setVolume] = React.useState(1);
  const [mute, setMute] = React.useState(false);
  const [timer, setTimer] = React.useState(0); 

  const startWebCall = async () => {   
    if(callOnGoing.current) {
      alert("Call is already in progress. Please end the call before starting a new one.");
      return;
    }  
    const startCall = await vapi.start(interviewDetails.data?.vapiBotId ?? "", {  
      variableValues: {
        attitude: interviewDetails.data?.characteristics
      }, 
    }); 
    setCallVapi(startCall);   
    callOnGoing.current = true;   
  }; 

  const toggleMute = async () => { 
    navigator?.mediaDevices.getUserMedia({audio:true,video:false}).then(function(stream) {
      const track = stream.getAudioTracks()[0];
      if(track) {
        track.enabled = !mute; 
        setMute(() => !mute); 
      } else {
        alert("No audio track found"); 
      }
    }); 
  };

  const setCallVolumeCall = async (volume: number) => { 
    if(document) {
      const audios = [...document.getElementsByTagName("audio")];
      audios.forEach(audio => audio.volume = volume/100); 
      setVolume(volume);
    } 
  };

  const endWebCall = async () => {
    vapi.stop(); 
    callOnGoing.current = false;
    setCallVapi(null);
    setTimer(0); 
  };   
   
  React.useEffect(() => { 
    vapi.on("speech-start", () => {
      setInterviewerSpeaking(true);
    }); 
    vapi.on("speech-end", () => {
      setInterviewerSpeaking(false); 
    });    
    vapi.on("call-end", () => {
      callOnGoing.current = false; 
      setCallVapi(null); 
      setTimer(0); 
    });
    return () => {
      vapi.stop();
    }; 
  }, []); 

  return {
    startWebCall,
    endWebCall,  
    volume, 
    timer, 
    callVapi, 
    inteviewerSpeaking,
    usersNotes, 
    callOnGoing: callOnGoing.current,
    mute,
    loadingDetails: interviewDetails.isPending,
    callDetails: interviewDetails.data,
    setUsersNotes, 
    setCallOnGoing: (setCallOnGoing: boolean) => callOnGoing.current = setCallOnGoing,  
    toggleMute,
    setCallVolumeCall,
    
  }; 
}