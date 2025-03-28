import { z } from "zod";

import {
  createTRPCRouter, 
  publicProcedure,
} from "~/server/api/trpc";
import { VapiClient } from "@vapi-ai/server-sdk";

export const demoRouter = createTRPCRouter({
  demoFeedback: publicProcedure
    .input(z.object({ callId: z.string() }))
    .mutation(async ({ input }) => {
      if(!process.env.VAPI_API_KEY) {
        throw new Error("[SERVER_ERROR]: VAPI_API_KEY not found");
      }

      const client = new VapiClient({ token: process.env.VAPI_API_KEY ?? "" });

      const callDetails = await client.calls.get(input.callId);
      if(!callDetails) {
        throw new Error("[SERVER_ERROR]: Call not found");
      } 

      return {
        id: callDetails.id,
        summary: callDetails.analysis?.summary,
        successEvaluation: callDetails.analysis?.successEvaluation,
      };
    }), 
});