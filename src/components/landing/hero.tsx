import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { 
  motion, 
} from "framer-motion";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react"; 
import { MenuBar } from "./menu_bar";
import { Mic } from "lucide-react";
import { SlideShow } from "./slide_show";
import { DemoDialog } from "./demo_dialog";

export const AuroraHero = () => { 
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession(); 
  
  return ( 
    <div className="bg-gray-950 min-h-screen h-[120vh] dots"> 
      <MenuBar /> 
      <motion.div 
        className="flex justify-center items-center h-[55%]"
      >
        <div className="relative z-10 flex flex-col items-center"> 
          <h1 className="max-w-4xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-6xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
            AI Mock interviews 
            <br /> for developers 
          </h1>   
          <div className="flex flex-row gap-10 my-6">  
            <motion.button 
              whileHover={{ scale: 1.015, }}
              whileTap={{ scale: 0.985, }}
              onClick={async () => {
                await router.push("#demo");
              }}
              className="group relative flex w-fit items-center gap-1.5 bg-[#3760b7] py-4 text-xl px-10 rounded-full"
            >
            See In Action <FiArrowRight className="transition-transform group-hover:rotate-45 group-active:-rotate-12" />
            </motion.button>
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
              className="group relative flex w-fit items-center gap-1.5 text-black bg-white py-4 text-xl px-10 rounded-full"
            > 
              Sign Up <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
            </motion.button>
          </div> 
          <motion.button 
            whileHover={{ 
              scale: 1.015, backgroundColor: "black", color: "white" 
            }}
            whileTap={{ scale: 0.985, }}
            onClick={async () => {
              setOpen(true);
            }}
            style={{ 
              boxShadow: "0 0 0 2px #000, 0 0 0 4px #fff", 
              transition: "ease-in-out .2s",
            }}
            className="group relative flex w-fit items-center gap-1.5 bg-white text-black p-6 rounded-full mt-16 text-2xl"
          > 
            Try a mock interview <Mic className="w-6 h-6" />
          </motion.button>
        </div>
      </motion.div> 
      <SlideShow />
      <DemoDialog open={open} setOpen={setOpen} />
    </div>
  );
};