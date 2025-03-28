import React from "react"; 
import Vapi from "@vapi-ai/web";
import { Mock_Interviewers } from "~/utils/constants";
import { useDemoStore } from "./use-store";
import { api } from "~/utils/api";

export default function useDemo() {
  if(!process.env.NEXT_PUBLIC_PUBLIC_VAPI_API || process.env.NEXT_PUBLIC_ASSISTANT_ID === "") {
    throw new Error("[ERROR]: VAPI_API_KEY not found or assistant not found");
  }
  const retrieveCallSummary = api.demo.demoFeedback.useMutation();
  const [interviewer, setInterviewer] = React.useState(Mock_Interviewers[0]); 
  const {
    incrementNumberOfCalls,
    numberOfCalls,
    setLatestCallId,
    setResultsOfLatestCall,
    latestCallId,
    resultsOfLatestCall,
  } = useDemoStore();  
  const [vapiDetails, setVapiDetails] = React.useState({
    isConnected: false,
    isConnecting: false,
    isEndingCall: false,
    assistantIsSpeaking: false,
    volumeLevel: 0,
    callOnGoing: false,
  }); 
  const vapi = React.useMemo(() => new Vapi(process.env.NEXT_PUBLIC_PUBLIC_VAPI_API ?? "", undefined, {
    alwaysIncludeMicInPermissionPrompt: true,
  }), []);

  type keyVapi = keyof typeof vapiDetails;
  const vapiStateUpdate = (key: keyVapi, value: typeof vapiDetails[keyVapi]) => {
    setVapiDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  }; 
  const startWebCall = async () => {   
    if(vapiDetails.callOnGoing) {
      alert("Call is already in progress. Please end the call before starting a new one.");
      return;
    }
    if(numberOfCalls >= 3 && process.env.NODE_ENV !== "development") {
      alert("You have reached the maximum number of calls.");
      return;
    }
    incrementNumberOfCalls();
    vapiStateUpdate("callOnGoing", true);
    const startCall = await vapi.start(process.env.NEXT_PUBLIC_ASSISTANT_ID ?? "", {  
      variableValues: {
        attitude: interviewer?.description
      },
    });
    setLatestCallId(startCall?.id ?? ""); 
    setTimeout(() => {  
      vapi.stop();
      vapiStateUpdate("callOnGoing", false);
    }, 60000);
    return startCall; 
  }; 
  const endWebCall = () => {
    vapi.stop(); 
    vapiStateUpdate("callOnGoing", false); 
  };  
  const retrieveDetailsEndOfCall = async () => {
    if(!latestCallId) {
      alert("No call ID found. Please start a call first.");
      return;
    }
    const callDetails = await retrieveCallSummary.mutateAsync({ callId: latestCallId });
    if(!callDetails) {
      alert("No call details found. Please start a call first.");
      return;
    }
    setResultsOfLatestCall({
      id: callDetails.id,
      summary: callDetails.summary ?? "",
    });
  };
 
  React.useEffect(() => {
    vapi.on("call-start", () => {         
      vapiStateUpdate("isConnected", true);
      vapiStateUpdate("isConnecting", false);
    }); 
    vapi.on("call-end", () => {  
      vapiStateUpdate("isConnecting", false);
      vapiStateUpdate("isEndingCall", false);
      vapiStateUpdate("isConnected", false); 
      retrieveDetailsEndOfCall().then(() => {
        vapiStateUpdate("callOnGoing", false); 
      }).catch((error) => {
        console.error(error);
        alert("Error retrieving call details. Please try again later.");
      });
    }); 
    vapi.on("speech-start", () => { 
      vapiStateUpdate("assistantIsSpeaking", true);
    }); 
    vapi.on("speech-end", () => {  
      vapiStateUpdate("assistantIsSpeaking", false);
    });
  
    vapi.on("volume-level", (level) => { 
      vapiStateUpdate("volumeLevel", level);
    });
  
    vapi.on("error", (error) => {
      console.error(error);  
      vapiStateUpdate("isConnecting", false);
      vapiStateUpdate("isEndingCall", false);
      vapiStateUpdate("isConnected", false); 
    }); 
    return () => {
      vapi.stop();
    };
  }, []);

  return {
    startWebCall,
    endWebCall,
    interviewer, 
    setInterviewer,
    callOnGoing: vapiDetails.callOnGoing,
    setCallOnGoing: (setCallOnGoing: boolean) => vapiStateUpdate("callOnGoing", setCallOnGoing),
    resultsOfLatestCall
  }; 
}