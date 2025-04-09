import React from "react"; 
import { Card } from "../ui/card";   
import { coloring, contrastColor } from "~/utils/constants";

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
  "vapiBotId": "test-1",
  "backgroundUrl": "https://images.unsplash.com/photo-1704204656144-3dd12c110dd8?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YW1hem9uJTIwd2Vic2l0ZXxlbnwwfHwwfHx8MA%3D%3D" 
}; 

export const Featured: React.FC<{
  onClick?: () => void,
}> = ({
  onClick = () => null,
}) => { 
  return <div className="relative hover:scale-[1.1] transition-all" onClick={onClick}>  
    <Card  
      style={{ 
        position: "relative",
        top: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
      className="w-[250px] z-10 h-[180px] rounded-lg flex flex-col items-center justify-center bg-transparent cursor-pointer transition-all">
      <h1 className="text-sm text-pretty font-bold"> {
        testFeature.name 
      } </h1>
      <p className="text-muted-foreground text-xs text-center w-[90%] flex flex-wrap"> {testFeature.description} </p>
      <div className="flex flex-row gap-1 pt-4 flex-wrap w-[90%]"> 
        {
          testFeature.characteristics.map((characteristic, index) => { 
            const bgColor = coloring[characteristic.toLowerCase() as keyof typeof coloring] || "#1e293b";
            return <span key={index} 
              style={{
                backgroundColor: bgColor,
                color: contrastColor(bgColor),
              }}
              className={"text-[10px] text-pretty rounded-full font-bold px-1 py-1"}>{characteristic} </span>; 
          })
        }
      </div>
    </Card>
    <Card
      style={{ 
        backgroundImage: `url(${testFeature.backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", 
        zIndex: 0,
        position: "absolute",
        top: 0,
        transition: "background 300ms ease-in 200ms",
        left: 0,
      }}
      className="w-[250px] h-[180px] rounded-lg transition-all"> </Card>
    <img src={testFeature.botIconUrl} alt="bot" className="absolute w-10 h-10 bottom-[-10px] z-20 right-[-10px] rounded-full border-1 border-white" />
  </div>;
};