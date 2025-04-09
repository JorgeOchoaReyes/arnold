import type React from "react"; 

export const CallControl: React.FC = () => {
  return (
    <div className="flex flex-row gap-4 w-full h-full bg-background border-[#1a1a1a] rounded-lg"> 
      <div className="flex flex-col items-center justify-center w-full h-full bg-background border-2 border-[#1a1a1a] rounded-lg"> 
        <h2 className="text-xl font-semibold text-white">Call Control</h2>
        <p className="text-sm text-gray-400">Control your call settings here.</p>
      </div> 
    </div>
  );
};
