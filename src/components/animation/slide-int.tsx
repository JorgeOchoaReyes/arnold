import type React from "react";
import { motion } from "framer-motion";

export  const SlideIn: React.FC<{
    children: React.ReactNode,
    direction: "left" | "right" | "up" | "down",
    duration?: number,  
    className?: string,
}> = ({children, direction, duration, className}) => {
  return (
    <motion.div 
      initial={{
        opacity: 0,
        x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
        y: direction === "up" ? -100 : direction === "down" ? 100 : 0,
      }}
      animate={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        duration: duration ?? 0.5, 
        ease: "easeInOut",
      }}
      className={className}
    > 
      {children}
    </motion.div>
  );
};