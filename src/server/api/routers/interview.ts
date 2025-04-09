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
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      console.log("input", input);
    }),
  getInterviewRecordById: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      console.log("input", input);
    }),
    

  seedInterviews: protectedProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      console.log("input", input);
    }),
});