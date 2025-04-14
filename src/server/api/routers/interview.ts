import { type InterviewRecord } from "@prisma/client";
import { z } from "zod"; 
import {
  createTRPCRouter, 
  protectedProcedure,  
} from "~/server/api/trpc";

const interviewZod = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  duration: z.string(),
  characteristics: z.array(z.string()),
  companySimilarTo: z.array(z.string()),
  interviewType: z.string(),
  botIconUrl: z.string().nullable(),
  vapiBotId: z.string(),
  backgroundUrl: z.string().nullable(),
}); 
 
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
  "vapiBotId": "8899d743-bfda-434e-97d5-dbd21f60fa1c",
  "backgroundUrl": "https://images.unsplash.com/photo-1704204656144-3dd12c110dd8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW1hem9uJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D",
};

export const interviewRouter = createTRPCRouter({
  listInterviews: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      console.log("input", input);
    }), 
  startInterviewRecord: protectedProcedure
    .input(z.object({ interview: interviewZod}))
    .mutation(async ({ input, ctx }) => {
      const { interview } = input;   
      const newRecord: Omit<InterviewRecord, "id"> = {
        interviewId: interview.id,
        userId: ctx.session.user.id, 
        vapiBotId: interview.vapiBotId,
        name: interview.name,
        description: interview.description,
        characteristics: interview.characteristics,
        companySimilarTo: interview.companySimilarTo,   
        feedback: null,
        resumeId: null,
        status: "scheduled",
        analysisStatus: "pending",
        interviewType: interview.interviewType,
        vapiCallId: null,
        usersCode: null,
        usersNotes: null,
        analysisResult: null,
        startTime: null,
        endTime: null, 
      };
      try {
        const existingRecord = await ctx.db.interviewRecord.create({
          data: newRecord,
        });
        if (existingRecord) {
          return existingRecord.id; 
        }
      } catch (error) {
        console.error("Error checking existing record:", error);
        return null;
      }
    }),
  getInterviewRecords: protectedProcedure 
    .query(async ({ ctx }) => {
      try {
        const records = await ctx.db.interviewRecord.findMany({
          where: {
            userId: ctx.session.user.id,
          }, 
        });
        return records;
      } catch (error) {
        console.error("Error fetching interview records:", error);
        return null;
      }
    }),
  getInterviewRecordById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input; 
      if(!id || id === "") {
        console.log("No Id");
        return null;
      }
      try {
        const record = await ctx.db.interviewRecord.findUnique({
          where: {
            id,
          },
        });
        return record;
      } catch (error) {
        console.error("Error fetching interview record:", error);
        return null;
      }
    }), 
  seedInterviews: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      console.log("input", input);
    }),
});