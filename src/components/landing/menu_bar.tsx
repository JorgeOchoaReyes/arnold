import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Button } from "../ui/button";

const options = [ 
  { name: "Arnold", href: "/" },
  { name: "Use Cases", href: "/use-cases" },
  { name: "Features", href: "/features" }, 
  { name: "Blog", href: "/blog" },  
  { name: "Pricing", href: "#pricing" }, 
];

export const MenuBar = () => {
  const router = useRouter();

  return (
    <motion.div> 
      <div className="flex flex-row items-center justify-center px-4 pt-4 bg-[#0f0e13] border-b border-gray-800 gap-32">                
        {
          options.map((option) => ( 
            <motion.button
              key={option.name}
              whileHover={{ 
                borderBottomWidth: 2,
                borderBottomColor: "white",
                color: "white", 
              }}
              whileTap={{
                scale: 0.95,
              }}
              style={{ 
                borderBottomWidth: 2,
                borderBottomColor: "transparent",
                color: "#b6b6b7",
                transition: "ease-in-out 0.2s",
              }}
              onClick={() => router.push(option.href)}
              className="text-gray-50 hover:text-gray-100 pb-4"
            >
              {option.name.toUpperCase()}
            </motion.button> 
          ))
        } 
        <div className="hover:text-gray-100 pb-4"> 
          <Button onClick={() => router.push("/dashboard")} className="p-4 rounded-xl bg-white hover:bg-slate-300"> 
            Get Started
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
