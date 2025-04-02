import { z } from "zod"; 
import {
  createTRPCRouter, 
  protectedProcedure,  
} from "~/server/api/trpc"; 
import { uploadFileToStorage, deleteFileFromStorage, generateSignedUrl } from "~/server/server_util";  

export const userRouter = createTRPCRouter({
  updateUser: protectedProcedure
    .input(z.object({ 
      name: z.string().nullable().optional(), 
      resumeUri: z.string().nullable().optional(), 
      imageUri: z.string().nullable().optional(), 
    }))
    .mutation(async ({ input, ctx }) => {
      const { name, resumeUri, imageUri } = input;
      const resumeUniqueName = ctx.session.user.id + "-" + Date.now() + ".pdf";
      const imageUniqueName = ctx.session.user.id + "-" + Date.now() + ".jpg";
      const uploadResumeUri = resumeUri ? await uploadFileToStorage(resumeUri, resumeUniqueName) : null;
      const uploadImageUri = imageUri ? await uploadFileToStorage(imageUri, imageUniqueName) : null;
      const db = ctx.db;

      const errors = { name: null, image: null, resume: null, } as Record<string, string | null>;

      if(!uploadImageUri && imageUri) {
        errors.image = "Error storing image"; 
      } 
      if(!uploadResumeUri && resumeUri) {
        errors.resume = "Error storing resume"; 
      }

      if(uploadResumeUri) {
        try {
          const existingResume = await db.resume.findFirst({
            where: { userId: ctx.session.user.id },
          });
          if (existingResume) {
            const gcpPath = existingResume.fileUrl.split("/").pop() ?? "";
            await deleteFileFromStorage(gcpPath);  
            await db.resume.update({
              where: { id: existingResume?.id ?? "" },
              data: {
                userId: ctx.session.user.id,
                name: resumeUniqueName,
                fileUrl: uploadResumeUri,
              },
            }); 
          } else {
            await db.resume.create({
              data: {
                userId: ctx.session.user.id,
                name: resumeUniqueName,
                fileUrl: uploadResumeUri,
              },
            });
          }
        } catch (error) {
          console.log("Error saving resume:", error);
          if(!errors.resume) errors.resume = "Error saving resume"; 
          await deleteFileFromStorage(uploadResumeUri.split("/").pop() ?? "");
        }
      } 

      try {
        await db.user.update({
          where: { id: ctx.session.user.id },
          data: {
            name: name ?? undefined, 
            image: uploadImageUri ?? undefined,
          },
        });
      } catch (error) {
        console.log("Error saving user:", error);
        if(!errors.image) errors.image = "Error saving image";
        await deleteFileFromStorage(uploadImageUri?.split("/").pop() ?? "");
      } 

      const hasErrors = Object.values(errors).some((error) => error !== null);

      return { 
        name: name ?? undefined, 
        image: uploadImageUri ?? undefined,
        resumeUri: uploadResumeUri ?? undefined,
        errors: hasErrors ? errors : null,
      }; 
    }),  
  getResumeLink: protectedProcedure 
    .query(async ({ ctx }) => { 
      const db = ctx.db;
      const resume= await db.resume.findFirst({ 
        where: { userId: ctx.session.user.id }, 
      });
      if (!resume) return null;
      const file = resume.fileUrl.split("/").pop() ?? "";
      const signedurl = await generateSignedUrl(file);
      return {
        url: signedurl ?? "",
        updatedAt: resume.updatedAt,
      };
    }), 
  deleteResume: protectedProcedure 
    .mutation(async ({ ctx }) => {
      const db = ctx.db; 
      const resume = await db.resume.findFirst({
        where: { userId: ctx.session.user.id },
      });
      if (!resume) return null;
      const gcpPath = resume.fileUrl.split("/").pop() ?? "";
      await deleteFileFromStorage(gcpPath);
      await db.resume.delete({
        where: { id: resume.id },
      });
      return resume; 
    }),
}); 