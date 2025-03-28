import React from "react"; 
import Vapi from "@vapi-ai/web";
import { Mock_Interviewers } from "~/utils/constants";

export default function useDemo() {
  if(!process.env.NEXT_PUBLIC_PUBLIC_VAPI_API || process.env.NEXT_PUBLIC_ASSISTANT_ID === "") {
    throw new Error("[ERROR]: VAPI_API_KEY not found or assistant not found");
  }
  const [interviewer, setInterviewer] = React.useState();
  const [callOnGoing, setCallOnGoing] = React.useState(false);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_PUBLIC_VAPI_API ?? "");  

  const startWebCall = async () => {  
    const startCall = await vapi.start(process.env.NEXT_PUBLIC_ASSISTANT_ID ?? "");
    setCallOnGoing(true);
    setTimeout(() => { 
      // Allow only 1 minute calls
      vapi.stop();
      setCallOnGoing(false);
    }
    , 1000);
    return startCall; 
  };

  const endWebCall = async () => {
    const endCall = vapi.stop();
    setCallOnGoing(false);
    return endCall;
  }; 

  return {
    startWebCall,
    endWebCall,
    interviewer, 
    setInterviewer,
    callOnGoing,

  };

}