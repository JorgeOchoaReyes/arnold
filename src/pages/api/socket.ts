import { type NextApiRequest, type NextApiResponse } from "next";
import {WebSocketServer} from "ws"; 
import { GoogleGenAI } from "@google/genai"; 

export const arnoldDemo = async ({ 
}: {
    userTranscript: string;
}) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
  const prompt = `List a few popular cookie recipes using this JSON schema:
    Recipe = {'recipeName': string}
    Return: Array<Recipe>
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });

  return response; 
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const wss  = new WebSocketServer({
    noServer: true
  });

  wss.on("connection",  
    function connection(ws: WebSocket) {
      wss.on("message", 
        function incoming(message: string) {
          console.log("received: ", message);
          ws.send(message);  
        }
      );      
    }
  );

  if(!res.writableEnded) {
    res.writeHead(101, {
      "Content-Type": "application/json",
      "Connection": "Upgrade",
      "Upgrade": "websocket",
    });
    res.end(); 
  }

  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), function done(ws) {
    wss.emit("connection", ws, req); 
  });

}
