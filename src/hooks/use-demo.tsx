import React from "react"; 
import Vapi from "@vapi-ai/web";

export default function useDemo() {
  if(!process.env.NEXT_PUBLIC_PUBLIC_VAPI_API || process.env.NEXT_PUBLIC_ASSISTANT_ID === "") {
    throw new Error("[ERROR]: VAPI_API_KEY not found or assistant not found");
  }
  const vapi = new Vapi(process.env.NEXT_PUBLIC_PUBLIC_VAPI_API ?? "");  

  const startWebCall = async () => {  
    const startCall = await vapi.start(process.env.NEXT_PUBLIC_ASSISTANT_ID ?? "");
    return startCall; 
  };

  const endWebCall = async () => {
    const endCall = vapi.stop();
    return endCall;
  };

  return {
    startWebCall,
    endWebCall,
  };

}