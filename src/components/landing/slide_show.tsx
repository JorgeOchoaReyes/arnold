import React from "react"; 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"; 
import Autoplay from "embla-carousel-autoplay"; 
import { Mock_Interviewers } from "~/utils/constants";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";

export const SlideShow = () => {
    
  return ( 
    <div className="w-[90%] mx-auto">
      <Carousel
        plugins={[
          Autoplay({
            delay: 1000,  
          }),
        ]}
        opts={{
          align: "start",
          loop: true,   
        }}
        className="flex justify-center items-center w-full"
      >
        <CarouselContent>
          {Mock_Interviewers.map((a, index) => (
            <CarouselItem key={index} className="lg:basis-1/5 xl:basis-1/6 flex justify-center"> 
              <div className="flex flex-col items-center gap-2 bg-[#0f0e13] border-[#262628] border-2 rounded-sm justify-center p-6">  
                <Avatar className="w-20 h-20 mt-4 mb-2">
                  <AvatarImage src={a.src} alt={a.name} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="p-1 flex flex-col justify-center items-center">
                  <h3>{a.name}</h3>
                  <hr />
                  <p className="text-pretty text-gray-400 leading-tight">{a.description}</p>
                </div> 
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>  
    </div>
  );
};