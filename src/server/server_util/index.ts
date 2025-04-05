import { GoogleGenAI } from "@google/genai";
import { Storage } from "@google-cloud/storage";

export const arnoldDemo = async ({ 
}: {
    userTranscript: string;
}) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
  const prompt = `List a few popular cookie recipes using this JSON schema:

    Recipe = {'recipeName': string}
    Return: Array<Recipe>`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response; 
};


const encodedGcp = process.env.gcpEncoded ?? "";
const gpcFilePaths = "arnold-resumes"; 

const getGcpClientCredentials = () => { 
  const decodedServiceAccount = Buffer.from(encodedGcp, "base64").toString("utf-8");
  const credentials = JSON.parse(decodedServiceAccount) as {project_id: string, private_key: string, client_email: string};
  return credentials;
};

export const uploadFileToStorage = async (dataUri: string, file_name: string) => {
  const credentials = getGcpClientCredentials();
  const gcp_storage = new Storage(
    {
      projectId: credentials.project_id,
      credentials: credentials,
    }
  );  
  const matches = /^data:([A-Za-z-+\/]+);base64,(.+)$/.exec(dataUri); 
  try { 
    const fileContents = Buffer.from(matches?.[2] ?? "", "base64");
    if(!fileContents) {
      console.log("No file contents found");
      return null;
    }
    if(fileContents.length > 5 * 1024 * 1024) { 
      console.log("File size exceeds 5MB limit");
      return null;
    }
    const bucket = gcp_storage.bucket(gpcFilePaths);   
    const file = bucket.file(file_name);
    await file.save(fileContents, {
      metadata: {
        contentType: matches?.[1], 
      },
    }); 
    const filePath = `gs://${gpcFilePaths}/${file_name}`;
    return filePath;
  } catch (error) { 
    console.log("Failed", (error));
    return null;
  }
};

export const deleteFileFromStorage = async (file_name: string) => {
  const credentials = getGcpClientCredentials();
  const gcp_storage = new Storage(
    {
      projectId: credentials.project_id,
      credentials: credentials,
    }
  );  
  try {  
    const bucket = gcp_storage.bucket(gpcFilePaths);   
    const file = bucket.file(file_name);
    await file.delete(); 
    return true;
  } catch (error) {
    console.log("Failed", (error));
    return false;
  }
};

export const generateSignedUrl = async (file_name: string) => {
  const credentials = getGcpClientCredentials();
  const gcp_storage = new Storage(
    {
      projectId: credentials.project_id,
      credentials: credentials,
    }
  );  
  try {  
    const bucket = gcp_storage.bucket(gpcFilePaths);   
    const file = bucket.file(file_name); 
    const [url] = await file.getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + 30 * 60 * 1000, // 15 minutes
    }); 
    return url;
  } catch (error) {
    console.log("Failed", (error));
    return null;
  }
};