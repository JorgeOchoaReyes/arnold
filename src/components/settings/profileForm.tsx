/* eslint-disable @next/next/no-img-element */
import type React from "react"; 
import { useState, useRef } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { User } from "next-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Camera, Download, Loader2, Trash } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { toast } from "~/hooks/use-toast";
import { Label } from "../ui/label";
import { api } from "~/utils/api";

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }), 
});

type ProfileFormValues = z.infer<typeof profileFormSchema>

export const ProfileForm: React.FC<{
  user: User,
  resume: {
    url: string;
    updatedAt: Date;
  } | null;
}> = ({ user, resume }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
   
  const [imagePreview, setImagePreview] = useState<string | null>(user.image ?? null);
  const imageFileRef = useRef<HTMLInputElement>(null);
 
  const [resumePreview, setResumePreview] = useState<string | null>(resume?.url ?? null); 
  const resumeFileRef = useRef<HTMLInputElement>(null);

  const [trackChanges, setTrackChanges] = useState<Record<string, boolean>>({ 
    image: false,
    resume: false,
  });

  const updateUser = api.user.updateUser.useMutation(); 
  const deleteResume = api.user.deleteResume.useMutation();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: user.name?.split(" ")[0] ?? "", 
    },
  }); 
 
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,  
    setFnFDataUri: typeof setImagePreview,
    type: "image" | "resume"
  ) => {
    const file = e.target.files?.[0];
    setTrackChanges((prev) => ({ ...prev, [type]: true }));
    if (file) { 
      const reader = new FileReader();
      reader.onloadend = () => {
        setFnFDataUri(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }; 

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true); 
    try {   
      const _updateUser = await updateUser.mutateAsync({
        name: (data.firstName !== user.name) ? data.firstName : null,
        imageUri: trackChanges.image ? imagePreview : null,
        resumeUri: trackChanges.resume ? resumePreview : null,
      });

      if(_updateUser.errors) {
        const errorMessages = Object.values(_updateUser.errors).filter((error) => error !== null);
        if (errorMessages.length > 0) {
          toast({
            title: "Error",
            description: errorMessages.join(", "),
            variant: "destructive",
          });
          return;
        }
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });

      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteResume = async () => {
    setIsLoading(true);
    try {
      await deleteResume.mutateAsync();
      toast({
        title: "Resume deleted",
        description: "Your resume has been deleted successfully.",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadARef = useRef<HTMLAnchorElement>(null);

  return (
    <Card className="w-[800px]">
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <div
                className="relative h-24 w-24 cursor-pointer overflow-hidden rounded-full border border-border"  
              >
                {imagePreview ? (
                  <img src={imagePreview || "/placeholder.svg"} alt="Profile" className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Camera className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
                <input
                  type="file"
                  ref={imageFileRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, setImagePreview, "image")}
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity hover:opacity-100 flex items-center justify-center">
                  <span className="text-xs text-white font-medium">Change</span>
                </div>
              </div>
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-medium">{user.name ?? "User"}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-col gap-10 max-w-sm" >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />  
              {
                resume ?
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">Resume</Label>
                    <div className="flex flex-row justify-between items-center w-full"> 
                      <Button
                        type="button" 
                        onClick={() => {
                          if(resume) {
                      downloadARef.current!.href = resume.url;
                      downloadARef.current!.download = "resume.pdf";
                      downloadARef.current!.click();
                          }
                        }}
                      >
                        <Download /> Download Resume
                      </Button> 
                      <Button
                        type="button"
                        variant="destructive"
                        disabled={isLoading}
                        onClick={handleDeleteResume}
                      > 
                        <Trash /> Delete
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                    Last updated: {resume.updatedAt.toLocaleDateString()}---- 
                      {resume.updatedAt.toLocaleTimeString()}
                    </p>
                  </div> : 
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="resume" >Upload File</Label>
                    <Input 
                      id="resume"  
                      ref={resumeFileRef}
                      type="file" 
                      multiple={false} 
                      accept="application/pdf"  
                      onChange={(e) => handleFileChange(e, setResumePreview, "resume")}
                    />
                  </div>
              }
            </div> 

            <div className="flex flex-row justify-between items-center w-full">     
              <Button type="submit" disabled={isLoading || (
                trackChanges.image === false && 
                trackChanges.resume === false &&
                form.formState.isDirty === false
              )}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save changes
              </Button>
              <Button type="button" disabled={isLoading} onClick={async () => await signOut()} variant="destructive">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Out
              </Button> 
            </div>
          </form>
          <a ref={downloadARef} className="hidden" /> 
        </Form>
      </CardContent>
    </Card>
  );
};

