import { useEffect, useState } from "react";
 import { Mic, Headphones, Volume2 } from "lucide-react";
 
 const SplashLoader = () => {
   const [animation, setAnimation] = useState(1);
   
   useEffect(() => {
     const interval = setInterval(() => {
       setAnimation(prev => prev === 3 ? 1 : prev + 1);
     }, 500);
     
     return () => clearInterval(interval);
   }, []);
 
   return (
     <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
       <div className="relative flex flex-col items-center">
         <div className="flex items-center mb-4">
           {animation === 1 && <Mic className="text-primary h-12 w-12 animate-bounce" />}
           {animation === 2 && <Headphones className="text-primary h-12 w-12 animate-pulse" />}
           {animation === 3 && <Volume2 className="text-primary h-12 w-12 animate-ping" />}
         </div>
         <h1 className="text-4xl font-bold tracking-tight">
           Hear<span className="text-primary">Me</span>Out
         </h1>
         <div className="mt-8 flex space-x-2">
           <div className="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
           <div className="h-3 w-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.2s" }}></div>
           <div className="h-3 w-3 rounded-full bg-primary animate-pulse" style={{ animationDelay: "0.4s" }}></div>
         </div>
       </div>
     </div>
   );
 };
 
 export default SplashLoader;