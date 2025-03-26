import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { 
  motion, 
} from "framer-motion";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"; 
import { MenuBar } from "./menu_bar";

export const AuroraHero = () => { 
  const router = useRouter();
  const { data: session } = useSession(); 
  
  return ( 
    <div className="bg-gray-950 min-h-screen h-screen dots"> 
      <MenuBar /> 
      <motion.div 
        className="flex justify-center items-center h-[80%]"
      >
        <div className="relative z-10 flex flex-col items-center">
          <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
            Secure your dream job 🚀
          </span> 
          <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
            AI Mock interviews 
            <br /> for developers 
          </h1> 
          <motion.button 
            whileHover={{ scale: 1.015, }}
            whileTap={{ scale: 0.985, }}
            onClick={async () => {
              if (session) {
                await router.push("/dashboard");
                return;
              }
              await router.push("/sign-in");
            }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full  px-4 py-20"
          >
          Try it now!
            <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </motion.button>
        </div>
      </motion.div>
    
    </div>
  );
};