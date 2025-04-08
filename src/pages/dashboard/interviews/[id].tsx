import React from "react"; 
import PdfWindow from "~/components/interview/pdfWindow";
import { DashboardLayout } from "~/components/layout/DashboardLayout";
import { ResizableDiv } from "~/components/layout/resizeable";

const testFeature = {
  "id": "test-1",
  "name": "Amazon Technical Interview",
  "description": "Amazon Technical Interview focused on data structures and algorithms.",
  "duration": "20-30 minutes",
  "characteristics": [
    "Hard",
    "Technical Focused",
    "Foundations",
    "Neutral Feedback"
  ],
  "companySimilarTo": [
    "Google",
    "Microsoft",
    "Apple"
  ],
  "interviewType": "Technical",
  "botIconUrl": "/aggresive.svg",
  "vapiBotId": "test-1",
  "backgroundUrl": "https://images.unsplash.com/photo-1704204656144-3dd12c110dd8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW1hem9uJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D",
};

export default function InterviewPage () {
  return (
    <DashboardLayout open={false}>
      <div className="flex flex-1 flex-col gap-4 px-10 pt-0 mb-10">
        <h1>
          {testFeature.name}
        </h1>
        <div style={{
          height: 600,
          width: 800,
        }} className="flex flex-col items-center justify-center bg-background border-2 border-[#1a1a1a] rounded-lg"> 
          <PdfWindow /> 
        </div>
      </div>
    </DashboardLayout>
  );
};