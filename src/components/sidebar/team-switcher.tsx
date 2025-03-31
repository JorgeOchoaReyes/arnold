"use client";

import * as React from "react"; 
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem, 
} from "~/components/ui/sidebar";
import { useTheme } from "next-themes";

export function TeamSwitcher() { 
  const { systemTheme, theme } = useTheme(); 
  const isDark = theme === "system" ? systemTheme === "dark" : theme === "dark";
  const isLight = theme === "system" ? systemTheme === "light" : theme === "light";
  return (
    <SidebarMenu>
      <SidebarMenuItem> 
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground 0 h-fit"
        > 
          <div className="flex flex-col justify-center items-start"> 
            <div className="h-fit flex flex-row items-center w-fit justify-around rounded-xl"> 
              <div className="h-8 w-8 rounded-full bg-zinc-900 flex items-center justify-center">     
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">  
                  <g clipPath="url(#clip0_235_973)" > 
                    <path fillRule="evenodd" clipRule="evenodd" d="M100 -4.37114e-06C155.228 -6.78525e-06 200 44.7715 200 100C200 155.228 155.228 200 100 200C44.7715 200 5.67237e-06 155.228 3.25826e-06 100C8.44143e-07 44.7715 44.7715 -1.95703e-06 100 -4.37114e-06ZM100 -4.37114e-06C138.108 -6.03688e-06 169 30.8923 169 69C169 107.108 138.108 138 100 138C61.8924 138 31 107.108 31 69C31 30.8923 61.8924 -2.7054e-06 100 -4.37114e-06ZM132 69C132 51.3269 117.673 37 100 37C82.3269 37 68 51.3269 68 69C68 86.6731 82.3269 101 100 101C117.673 101 132 86.6731 132 69Z" fill="url(#paint0_linear_235_973)"/>
                  </g> 
                  <defs>
                    <linearGradient id="paint0_linear_235_973" x1="-9.344e-06" y1="23" x2="152.5" y2="160.5" gradientUnits="userSpaceOnUse"> 
                      <stop stopColor="#B0B9FF"/> 
                      <stop offset="1" stopColor="#E7E9FF"/> 
                    </linearGradient> 
                    <clipPath id="clip0_235_973">
                      <rect width="200" height="200" fill="white" transform="translate(7.62939e-06 200) rotate(-90)"/>
                    </clipPath>
                  </defs>
                </svg> 
              </div>   
              <svg width="150" height="50" viewBox="0 0 220 70" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                <text x="20" y="50" fontFamily="Verdana, sans-serif" fontSize="45" fontWeight="bold" fill={
                  isDark ? "white" : isLight ? "black" : "black"
                }>Arnold</text>   
              </svg>      
            </div>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
