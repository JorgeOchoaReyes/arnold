import React from "react"; 
import { FadeIn } from "~/components/animation/fade-in";
import { SlideIn } from "~/components/animation/slide-int";
import { CallControl } from "~/components/interview/call-control";
import { Notepad } from "~/components/interview/notepad";
import PdfWindow from "~/components/interview/pdfWindow";
import { DashboardLayout } from "~/components/layout/DashboardLayout"; 
import useInterview from "~/hooks/use-interview";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";

export default function InterviewPage () {
  const router = useRouter();
  const {
    usersNotes, 
    callOnGoing,
    loadingDetails, 
    callDetails,
    mute, 
    inteviewerSpeaking,
    volume,
    setUsersNotes,
    toggleMute, 
    startWebCall,
    endWebCall,
    setCallVolumeCall,
  } = useInterview(router.query.id as string); 

  return (
    <DashboardLayout open={false}>
      <div className="flex flex-1 flex-col gap-4 px-10 pt-0 mb-10">
        <h1>
          {callDetails?.name}
        </h1>
        {
          loadingDetails ? 
            <div className="flex w-full justify-center items-center h-[80vh]"> 
              <Loader2 className="animate-spin" />
            </div> :
            <>
              <FadeIn className="flex flex-row gap-4 w-full"> 
                <div style={{
                  height: 600,
                  width: "50%",
                }} className="flex flex-col items-center justify-center bg-background border-2 border-[#1a1a1a] rounded-lg"> 
                  <PdfWindow /> 
                </div> 
                <div style={{
                  height: 600,
                  width: "50%",
                }} className="flex flex-col items-center justify-center bg-background border-2 border-[#1a1a1a] rounded-lg"> 
                  <Notepad text={usersNotes} setText={setUsersNotes} /> 
                </div> 
              </FadeIn>
              <SlideIn direction="up"> 
                <CallControl 
                  callOnGoing={callOnGoing}
                  callerTalking={inteviewerSpeaking ?? false}
                  mute={mute}
                  volume={volume}
                  onClickMute={toggleMute}
                  onClickStart={startWebCall}
                  onClickEnd={endWebCall}
                  onChangeVolume={setCallVolumeCall}
                /> 
              </SlideIn>
            </>
        } 
      </div>
    </DashboardLayout>
  );
};