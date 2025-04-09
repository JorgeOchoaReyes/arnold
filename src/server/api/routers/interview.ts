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
  botIconUrl: z.string(),
  vapiBotId: z.string(),
  backgroundUrl: z.string(),
}); 


export const interviewRouter = createTRPCRouter({
  listInterviews: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      console.log("input", input);
    }), 
  startInterviewRecord: protectedProcedure
    .input(z.object({ interview: interviewZod}))
    .mutation(async ({ input }) => {
      console.log("input", input);
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