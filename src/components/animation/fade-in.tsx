import type React from "react"; 
import { motion } from "framer-motion";

export const FadeIn: React.FC<{
    children: React.ReactNode,
    duration?: number,
    className?: string,
}> = ({children, duration, className}) => { 

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
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