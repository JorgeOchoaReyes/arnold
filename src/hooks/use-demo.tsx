/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useRef } from "react"; 
import Vapi from "@vapi-ai/web";
import { Mock_Interviewers } from "~/utils/help";
import { useDemoStore } from "./use-store";
import { api } from "~/utils/api";
import { type Call } from "@vapi-ai/web/dist/api";
import { sleep } from "@trpc/server/unstable-core-do-not-import"; 

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
  const callOnGoing = useRef(false); 
  const vapi = React.useMemo(() => new Vapi(process.env.NEXT_PUBLIC_PUBLIC_VAPI_API ?? "", undefined, {
    alwaysIncludeMicInPermissionPrompt: true,
  }), []); 
  const [countDown, setCountDown] = React.useState(60);
  const [loadingResults, setLoadingResults] = React.useState(false);
  const [callVapi, setCallVapi] = React.useState<Call | null>(null);   

  const startWebCall = async () => {   
    if(callOnGoing.current) {
      alert("Call is already in progress. Please end the call before starting a new one.");
      return;
    } else if(numberOfCalls >= 3 && process.env.NODE_ENV !== "development") {
      alert("You have reached the maximum number of calls.");
      return;
    }

    incrementNumberOfCalls(); 
    const startCall = await vapi.start(process.env.NEXT_PUBLIC_ASSISTANT_ID ?? "", {  
      variableValues: {
        attitude: interviewer?.description
      }, 
    }); 
    setCallVapi(startCall); 
    callOnGoing.current = true; 
    setLatestCallId(startCall?.id ?? "");    
    setTimeout(() => { 
      if(callOnGoing.current) {
        endWebCall(startCall?.id).then().catch((error) => {
          console.error("Error ending call:", error); 
        });
      }
    }, 60000); 
  }; 

  const endWebCall = async (id?: string) => {
    vapi.stop(); 
    callOnGoing.current = false;
    setCountDown(60);  
    retrieveDetailsEndOfCall((id ? id : latestCallId) ?? "");
  };   

  const retrieveDetailsEndOfCall = async (id: string) => {
    if(!id) { 
      console.error("No call ID found.", latestCallId);
      alert("No call ID found. Please try again.");
      return;
    }
    setLoadingResults(true); 

    let callDetails = await retrieveCallSummary.mutateAsync({ callId: id }); 
    if(callDetails.summary === "" || callDetails.summary === undefined) {  
      for(let i = 1; i <= 3; i++) {
        await sleep(1000 * i); // Delay for the call to be processed
        console.log("Waiting for call to be processed...", i*1000,);
        callDetails = await retrieveCallSummary.mutateAsync({ callId: id ?? "" });
        if(callDetails.summary !== "" && callDetails.summary !== undefined) break; 
      }
      if(!callDetails) { 
        setLoadingResults(false);  
        return;
      }
    } 

    setResultsOfLatestCall({
      id: callDetails.id,
      summary: callDetails.summary ?? "",
    }); 
    setLoadingResults(false); 
  };  

  React.useEffect(() => {
    if(callOnGoing.current) {
      const interval = setInterval(() => setCountDown((prev) => prev - 1), 1000);
      if(countDown <= 0) {
        clearInterval(interval);
        setCountDown(60);
      }
      return () => clearInterval(interval);
    }
  }, [callOnGoing.current, callOnGoing.current]);

  return {
    startWebCall,
    endWebCall,
    interviewer, 
    setInterviewer,
    callOnGoing: callOnGoing.current,
    setCallOnGoing: (setCallOnGoing: boolean) => callOnGoing.current = setCallOnGoing,
    resultsOfLatestCall,
    countDown,
    loading: (loadingResults || retrieveCallSummary.isPending),
    callVapi, 
  }; 
}