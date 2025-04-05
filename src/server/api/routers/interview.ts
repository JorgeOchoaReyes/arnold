import { z } from "zod";

import {
  createTRPCRouter, 
  protectedProcedure,  
} from "~/server/api/trpc";

export const interviewRouter = createTRPCRouter({
  listInterviews: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      console.log("input", input);
    }), 
  startInterviewRecord: protectedProcedure
    .input(z.object({ text: z.string() }))
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