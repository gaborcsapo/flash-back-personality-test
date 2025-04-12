
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface WelcomePageProps {
  onStartTest: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ onStartTest }) => {
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePosition({ x: clientX, y: clientY });
    
    // Add a new trail dot
    const newTrail = { x: clientX, y: clientY, id: Date.now() };
    setTrails(prev => [...prev, newTrail].slice(-10)); // Keep only the last 10 trail points
  };

  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor trails - only on desktop */}
      {!isMobile && trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="absolute w-5 h-5 bg-y2k-hotpink rounded-full pointer-events-none z-10"
          style={{ left: trail.x, top: trail.y }}
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 1, delay: index * 0.05 }}
        />
      ))}

      <div className="y2k-container max-w-3xl w-full mx-auto relative overflow-hidden">
        <div className="absolute top-2 left-2 font-pixel text-xs text-white bg-y2k-blue px-2 py-1 rounded-md animate-blink">
          ONLINE NOW!
        </div>
        
        <div className="absolute top-2 right-2 font-pixel text-xs text-white bg-y2k-red px-2 py-1 rounded-md">
          VISITORS: 1337
        </div>

        <h1 className="y2k-title">
          <span className="text-shadow-y2k">PERSONALITY TEST</span>
        </h1>
        
        <motion.div 
          className="text-center mb-8 font-comic"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/70 rounded-xl p-4 mb-4 border-4 border-y2k-blue">
            <p className="text-y2k-purple text-xl mb-4">
              <span className="under-construction">
                Welcome to the ULTIMATE personality quiz!
              </span>
            </p>
            <p className="text-y2k-hotpink mb-4">
              Are you a <span className="font-bold">BOOMER</span> or <span className="font-bold">GEN-Z</span>? 
              <br />
              Are you <span className="font-bold">CHRONICALLY ONLINE</span> or a <span className="font-bold">CAVEMAN</span>?
            </p>
            <p className="text-y2k-blue">
              Take this <span className="italic">SCIENTIFIC</span> test to find out!! 😜
            </p>
          </div>
          
          <div className="mt-8 animated-border">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onStartTest} 
                className="y2k-button text-2xl px-8 py-4 text-white uppercase font-bold"
              >
                {">>>"}Start Quiz{"<<<"}
              </Button>
            </motion.div>
          </div>
          
          <div className="mt-6 font-pixel text-xs text-center overflow-hidden">
            <div className="marquee-text text-y2k-blue">
              ★★★ Best viewed with Internet Explorer 6.0 or Netscape Navigator! ★★★
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="font-comic text-xs text-y2k-blue animate-bounce">
          © 2003 CrAzY QuIz CoRpOrAtIoN ~ All Rights Reserved
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomePage;
