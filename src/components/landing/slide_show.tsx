import React from "react"; 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"; 
import Autoplay from "embla-carousel-autoplay";
import { CodeIcon, PersonStanding, Phone } from "lucide-react"; 

const agentMockInterviewTypes = [
  {
    id: 1,
    name: "Technical Interview",
    description: "Technical Interview Description",
    image: "technical-interview.jpg",
    icon: <CodeIcon size={48} />,
  },
  {
    id: 2,
    name: "Behavioral Interview",
    description: "Behavioral Interview Description",
    image: "behavioral-interview.jpg",
    icon: <PersonStanding size={48} />,
  }, 
  {
    id: 3,
    name: "Phone Interview",
    description: "Phone Interview Description",
    image: "phone-interview.jpg",
    icon: <Phone size={48} />,
  },
  {
    id: 4,
    name: "Technical Focus Interviewer",
    description: "Phone Interview Description",
    image: "phone-interview.jpg",
    icon: <Phone size={48} />,
  },
  {
    id: 5,
    name: "Friendly Interviewer",
    description: "Phone Interview Description",
    image: "phone-interview.jpg",
    icon: <Phone size={48} />,
  },
  {
    id: 6,
    name: "Aggresive Interviewer",
    description: "Phone Interview Description",
    image: "phone-interview.jpg",
    icon: <Phone size={48} />,
  },
  {
    id: 7,
    name: "Negative Interviewer",
    description: "Phone Interview Description",
    image: "phone-interview.jpg",
    icon: <Phone size={48} />,
  },
  {
    id: 8,
    name: "Helpful Interviewer",
    description: "Phone Interview Description",
    image: "phone-interview.jpg",
    icon: <Phone size={48} />,
  },
];

export const SlideShow = () => {
    
  return ( 
    <div className="w-[90%] mx-auto">
      <Carousel
        plugins={[
          Autoplay({
            delay: 1500,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,   
        }}
        className="flex justify-center items-center w-full"
      >
        <CarouselContent>
          {agentMockInterviewTypes.map((a, index) => (
            <CarouselItem key={index} className="lg:basis-1/5 xl:basis-1/6 flex justify-center"> 
              <div className="flex flex-col items-center gap-2 bg-[#0f0e13] border-[#262628] border-2 rounded-sm justify-center p-6">  
                {a.icon}
                <div className="p-1">
                  <h3>{a.name}</h3>
                  <p className="text-pretty">{a.description}</p>
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