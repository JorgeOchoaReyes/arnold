import React from "react"; 
import { Card } from "../ui/card";

export const Featured = () => {
  return <Card className="w-[200px] h-[100px] bg-secondary rounded-lg flex flex-col items-center justify-center hover:bg-slate-700 cursor-pointer transition-all">
    <h1 className="text-md text-pretty"> Featured Interviews </h1>
    <p className="text-muted-foreground text-sm"> No featured interviews yet </p>
  </Card>;
};