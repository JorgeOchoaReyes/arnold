import { sleep } from "@trpc/server/unstable-core-do-not-import";
import React from "react";

export const Notepad: React.FC<{
    text: string, 
    setText: React.Dispatch<React.SetStateAction<string>>,
    loading?: boolean,
    saveFunction?: () => Promise<void>,
}> = ({
  text, 
  setText,
  loading = false,
  saveFunction = async () => {
    await sleep(1000);  
    console.log("Saved!");
  },
}) => {
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);  
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (textAreaRef.current) { 
      const handleEventKeyDown = (event: KeyboardEvent) => {
        if(timerRef.current) {
          clearTimeout(timerRef.current); 
        }
        if(event.repeat) return;  
        if((event.ctrlKey && event.shiftKey && (event.key === "*") )|| event.key === "Tab") {
          event.preventDefault();
          const textArea = textAreaRef.current;
          if(!textArea) return;  
          const start = textArea.selectionStart;
          const end = textArea.selectionEnd;
          const currentValue = textArea.value; 
          const toAdd = event.key === "Tab" ? "    " : "•";
          const offset = event.key === "Tab" ? 4 : 1;
          const newValue = currentValue.substring(0, start) + toAdd + currentValue.substring(end); 
          textArea.value = newValue; 
          textArea.selectionStart = start + offset;
          textArea.selectionEnd = start + offset; 
          textArea.dispatchEvent(new Event("input", { bubbles: true })); 
          setText(newValue);
        }  
      }; 
      const handleEventKeyUp = () => {
        if(timerRef.current) {
          clearTimeout(timerRef.current); 
        }
        timerRef.current = setTimeout(() => {
          setSaving(() => true);
          saveFunction().then(() => {
            console.log("Saved!");
          }).catch((error) => {
            console.error("Error saving:", error);
          }).finally(() => {
            setSaving(() => false);
          }); 
        }, 3000);  
      };
      textAreaRef.current.addEventListener("keydown", handleEventKeyDown); 
      textAreaRef.current.addEventListener("keyup", handleEventKeyUp);
      return () => {
        if (textAreaRef.current) {
          textAreaRef.current.removeEventListener("keydown", handleEventKeyDown);
          textAreaRef.current.removeEventListener("keyup", handleEventKeyUp);
        }
      };
    }
  }, []);

  return (
    <div className="flex flex-col w-full h-full bg-background border-[#1a1a1a] rounded-lg relative"> 
      <textarea 
        ref={textAreaRef}
        rows={20}
        value={text}
        onChange={(e) => setText(e.target.value)}
        cols={50}
        placeholder="Type your notes here..."
        className="relative w-full h-full bg-[#fff3b5] border-[#1a1a1a] rounded-lg p-4 text-black text-pretty font-semibold" 
      />
      <p className="absolute text-xs text-gray-500 left-2 bottom-1">{saving ? "Saving. . . . " : ""} </p>
    </div>
  );
};