import React from "react"; 
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export const ToolTip: React.FC<{
    _trigger: React.ReactNode,
    _content: React.ReactNode,
}> = ({
  _trigger,
  _content
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {_trigger}
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center">
          {_content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};