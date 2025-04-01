import { z } from "zod";

import {
  createTRPCRouter, 
  publicProcedure,
} from "~/server/api/trpc";

export const interviewRouter = createTRPCRouter({
  listInterviews: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      console.log("input", input);
    }), 
});