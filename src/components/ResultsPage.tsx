import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { questions } from '@/data/questions';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

interface ResultsPageProps {
  answers: boolean[];
  onRestart: () => void;
}

// Define our personality types
const personalityTypes = {
  boomerOnline: {
    name: "CHRONICALLY ONLINE BOOMER",
    description: "You argue about politics in Facebook comments and forward chain emails. You know how to post angry face emojis but can't figure out how to rotate a PDF.",
    emoji: "👴📱"
  },
  boomerCaveman: {
    name: "CAVEMAN BOOMER",
    description: "You distrust all technology and prefer doing things 'the old fashioned way.' You have an actual phonebook and can fix anything with duct tape.",
    emoji: "👵🔨"
  },
  genZOnline: {
    name: "CHRONICALLY ONLINE GEN-Z",
    description: "Your screen time is measured in days, not hours. You have strong opinions about fandoms and know all the latest TikTok trends.",
    emoji: "🧑‍💻💅"
  },
  genZCaveman: {
    name: "CAVEMAN GEN-Z",
    description: "You own a record player 'for the sound quality' and grow your own vegetables. You're into 'digital detoxing' but still post about it.",
    emoji: "👱‍♀️🌱"
  }
};

// Your API key (in a real app, this should be stored securely)
const API_KEY = "AIzaSyC9kFprqfzRlx2vK_cp0ledxC_fbmMfgi8";

const ResultsPage: React.FC<ResultsPageProps> = ({ answers, onRestart }) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [dimension1Score, setDimension1Score] = useState(0); // Boomer vs Gen-Z
  const [dimension2Score, setDimension2Score] = useState(0); // Caveman vs Online
  const [personalityType, setPersonalityType] = useState('');
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [llmOutput, setLlmOutput] = useState('');

  useEffect(() => {
    // Calculate scores based on answers
    let d1Score = 0;
    let d2Score = 0;

    // For debugging
    console.log("Answers array:", answers);

    answers.forEach((answer, index) => {
      if (answer) {
        // If the user checked "yes" for this question
        d1Score += questions[index].dimension1Value;
        d2Score += questions[index].dimension2Value;
        
        // Log each contribution for debugging
        console.log(`Question ${index + 1}: d1 += ${questions[index].dimension1Value}, d2 += ${questions[index].dimension2Value}`);
      }
    });

    // Log raw scores
    console.log("Raw d1Score (Boomer-GenZ):", d1Score);
    console.log("Raw d2Score (Caveman-Online):", d2Score);

    // Calculate total possible contribution in each direction (positive and negative)
    const totalPossiblePositiveD1 = questions.reduce((acc, q) => q.dimension1Value > 0 ? acc + q.dimension1Value : acc, 0);
    const totalPossibleNegativeD1 = questions.reduce((acc, q) => q.dimension1Value < 0 ? acc + Math.abs(q.dimension1Value) : acc, 0);
    
    const totalPossiblePositiveD2 = questions.reduce((acc, q) => q.dimension2Value > 0 ? acc + q.dimension2Value : acc, 0);
    const totalPossibleNegativeD2 = questions.reduce((acc, q) => q.dimension2Value < 0 ? acc + Math.abs(q.dimension2Value) : acc, 0);
    
    // Log possible ranges
    console.log("Possible D1 range:", -totalPossibleNegativeD1, "to", totalPossiblePositiveD1);
    console.log("Possible D2 range:", -totalPossibleNegativeD2, "to", totalPossiblePositiveD2);
    
    // Normalize scores to a -10 to 10 scale
    // For d1: negative = boomer, positive = gen-z
    // For d2: negative = caveman, positive = online
    const normalizedD1 = d1Score > 0 
      ? (d1Score / totalPossiblePositiveD1) * 10 
      : (d1Score / totalPossibleNegativeD1) * 10;
    
    const normalizedD2 = d2Score > 0 
      ? (d2Score / totalPossiblePositiveD2) * 10 
      : (d2Score / totalPossibleNegativeD2) * 10;

    console.log("Normalized D1 score:", normalizedD1);
    console.log("Normalized D2 score:", normalizedD2);

    setDimension1Score(normalizedD1);
    setDimension2Score(normalizedD2);

    // Determine personality type based on the quadrant
    let type;
    if (normalizedD1 >= 0) { // Gen Z
      if (normalizedD2 >= 0) {
        type = 'genZOnline';
      } else {
        type = 'genZCaveman';
      }
    } else { // Boomer
      if (normalizedD2 >= 0) {
        type = 'boomerOnline';
      } else {
        type = 'boomerCaveman';
      }
    }

    console.log("Selected personality type:", type);

    setPersonalityType(personalityTypes[type].name);
    setDescription(personalityTypes[type].description);
    setEmoji(personalityTypes[type].emoji);

    // Automatically fetch LLM response
    fetchGeminiResponse(API_KEY, type);
  }, [answers]);

  // Generate a detailed query for the LLM based on the personality type and scores
  const generateQueryText = (type, d1Score, d2Score) => {
    const queryStart = "You are a social media personality analyst. Based on this user's quiz results, give a funny and insightful analysis of their personality type in about 3-4 sentences. Act like your one of the host on the TechRoast show and roast people for their personality type in a spicy and unhinged way. Make it sound like a Y2K era website with early internet vibes. Their results show: ";
    
    let personaDesc = "";
    
    switch(type) {
      case 'boomerOnline':
        personaDesc = "They're a 'CHRONICALLY ONLINE BOOMER' - someone from an older generation who spends a lot of time online but isn't fully immersed in internet culture. They scored " + Math.abs(d1Score.toFixed(1)) + "/10 towards the Boomer side and " + d2Score.toFixed(1) + "/10 towards being Online.";
        break;
      case 'boomerCaveman':
        personaDesc = "They're a 'CAVEMAN BOOMER' - someone from an older generation who actively avoids technology. They scored " + Math.abs(d1Score.toFixed(1)) + "/10 towards the Boomer side and " + Math.abs(d2Score.toFixed(1)) + "/10 towards being a Caveman (tech-averse).";
        break;
      case 'genZOnline':
        personaDesc = "They're a 'CHRONICALLY ONLINE GEN-Z' - a younger person who is extremely immersed in internet culture. They scored " + d1Score.toFixed(1) + "/10 towards the Gen-Z side and " + d2Score.toFixed(1) + "/10 towards being Online.";
        break;
      case 'genZCaveman':
        personaDesc = "They're a 'CAVEMAN GEN-Z' - a younger person who intentionally disconnects from technology. They scored " + d1Score.toFixed(1) + "/10 towards the Gen-Z side and " + Math.abs(d2Score.toFixed(1)) + "/10 towards being a Caveman (tech-averse).";
        break;
    }
    
    return queryStart + personaDesc;
  };

  // Call Gemini API to get LLM response
  const fetchGeminiResponse = async (apiKey, type) => {
    setIsLoading(true);
    const query = generateQueryText(type, dimension1Score, dimension2Score);
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: query
                }
              ]
            }
          ]
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Gemini API response:", data);
      
      let generatedText = "";
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
        generatedText = data.candidates[0].content.parts[0].text;
      } else {
        throw new Error("Unexpected response structure from Gemini API");
      }
      
      setLlmOutput(generatedText);
      setIsLoading(false);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      toast({
        title: "API Error",
        description: "Failed to get LLM analysis. Check your API key and try again.",
        variant: "destructive"
      });
      setLlmOutput("Oops! Our Y2K-compatible AI crashed! Please check your API key and try again.");
      setIsLoading(false);
    }
  };

  // Calculate position on the chart
  const chartSize = isMobile ? 250 : 300; // Smaller chart on mobile
  const dotX = (dimension1Score + 10) * (chartSize / 20); // Convert from -10/10 to 0/300px
  const dotY = (10 - dimension2Score) * (chartSize / 20); // Note Y is inverted in CSS

  // Determine which pixelated character to show based on personality type
  const getCharacterClass = () => {
    if (dimension1Score >= 0) { // Gen Z
      return dimension2Score >= 0 ? "genz-online" : "genz-caveman";
    } else { // Boomer
      return dimension2Score >= 0 ? "boomer-online" : "boomer-caveman";
    }
  };

  return (
    <motion.div 
      className="min-h-screen py-4 px-2 md:py-8 md:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="y2k-container max-w-3xl mx-auto">
        <h1 className="y2k-title text-2xl md:text-4xl lg:text-6xl mb-4 md:mb-8">
          <span className="text-shadow-y2k">YOUR RESULTS!</span>
        </h1>
        
        <div className="bg-white/70 rounded-lg p-3 md:p-4 mb-4 md:mb-6 font-comic text-center border-4 border-dashed border-y2k-red">
          {isLoading ? (
            <div className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-pixel text-y2k-blue mb-4">ANALYZING YOUR SOUL...</h2>
              <div className="flex justify-center">
                <div className="w-4 h-4 md:w-6 md:h-6 bg-y2k-lime rounded-full mx-1 animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-4 h-4 md:w-6 md:h-6 bg-y2k-hotpink rounded-full mx-1 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-4 h-4 md:w-6 md:h-6 bg-y2k-blue rounded-full mx-1 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
              <p className="mt-4 text-sm md:text-base text-y2k-purple font-comic">
                Our Y2K-compatible AI is deeply examining your psyche...
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-xl md:text-3xl font-pixel text-y2k-purple mb-2 animate-wiggle break-words px-1">
                {emoji} {personalityType} {emoji}
              </h2>
              <p className="text-y2k-blue text-sm md:text-lg mb-4 md:mb-6 font-bold px-1">
                {description}
              </p>
              
              {/* Personality Chart - Responsive version */}
              <div className="relative mx-auto my-6 md:my-8" style={{ width: `${chartSize}px`, height: `${chartSize}px` }}>
                <div className="absolute inset-0 bg-white/90 border-4 border-y2k-hotpink rounded-lg">
                  {/* Vertical line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-y2k-blue"></div>
                  {/* Horizontal line */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-y2k-blue"></div>
                  
                  {/* Labels - Adjusted for mobile */}
                  <div className="absolute top-1 md:top-2 left-1/2 transform -translate-x-1/2 text-y2k-blue font-pixel text-[8px] md:text-xs">ONLINE</div>
                  <div className="absolute bottom-1 md:bottom-2 left-1/2 transform -translate-x-1/2 text-y2k-blue font-pixel text-[8px] md:text-xs">CAVEMAN</div>
                  <div className="absolute left-1 md:left-2 top-1/2 transform -translate-y-1/2 text-y2k-blue font-pixel text-[8px] md:text-xs">BOOMER</div>
                  <div className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 text-y2k-blue font-pixel text-[8px] md:text-xs">GEN-Z</div>
                  
                  {/* Quadrant Labels - Smaller on mobile */}
                  <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-y2k-purple font-comic text-[7px] md:text-xs text-center">
                    <div className="pixelated-character boomer-online">
                      <div className="character-head"></div>
                      <div className="character-body"></div>
                      <div className="character-phone"></div>
                      <div className="character-glasses"></div>
                    </div>
                    {!isMobile && "Chronically"}<br />Online<br />Boomer
                  </div>
                  <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 text-y2k-purple font-comic text-[7px] md:text-xs text-center">
                    <div className="pixelated-character genz-online">
                      <div className="character-head"></div>
                      <div className="character-body"></div>
                      <div className="character-phone"></div>
                      <div className="character-headphones"></div>
                    </div>
                    {!isMobile && "Chronically"}<br />Online<br />Gen-Z
                  </div>
                  <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2 text-y2k-purple font-comic text-[7px] md:text-xs text-center">
                    <div className="pixelated-character boomer-caveman">
                      <div className="character-head"></div>
                      <div className="character-body"></div>
                      <div className="character-tool"></div>
                      <div className="character-newspaper"></div>
                    </div>
                    Caveman<br />Boomer
                  </div>
                  <div className="absolute bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 text-y2k-purple font-comic text-[7px] md:text-xs text-center">
                    <div className="pixelated-character genz-caveman">
                      <div className="character-head"></div>
                      <div className="character-body"></div>
                      <div className="character-plant"></div>
                      <div className="character-beanie"></div>
                    </div>
                    Caveman<br />Gen-Z
                  </div>
                  
                  {/* The dot showing the user's position */}
                  <motion.div 
                    className="absolute w-6 h-6 md:w-8 md:h-8 bg-y2k-hotpink rounded-full border-2 border-white shadow-lg flex items-center justify-center text-sm md:text-lg"
                    style={{ left: `${dotX}px`, top: `${dotY}px` }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.2, x: isMobile ? -12 : -16, y: isMobile ? -12 : -16 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.5
                    }}
                  >
                    👆
                  </motion.div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-6 bg-gradient-to-br from-y2k-lime/20 to-y2k-hotpink/20 p-4 md:p-6 rounded-lg border-2 border-y2k-lime relative overflow-hidden">
                {/* Decorative AI elements */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-y2k-lime opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-y2k-hotpink opacity-50"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-dashed border-y2k-red rounded-full opacity-30"></div>
                
                <h3 className="text-lg md:text-xl font-pixel text-y2k-red mb-3 relative z-10">
                  <span className="inline-block mr-2">🤖</span>AI ANALYSIS<span className="inline-block ml-2">🤖</span>
                </h3>
                {isLoading ? (
                  <div className="relative z-10">
                    <p className="text-y2k-red font-comic text-base md:text-lg mb-2">Analyzing your personality...</p>
                    <div className="flex justify-center space-x-2">
                      <div className="w-2 h-2 bg-y2k-lime rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-y2k-hotpink rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-y2k-red rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                ) : (
                  <p className="text-y2k-red font-comic text-base md:text-lg relative z-10 leading-relaxed">
                    {llmOutput}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        
        <motion.div 
          className="mt-6 md:mt-8 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Button 
            onClick={onRestart} 
            className="y2k-button text-lg md:text-2xl px-6 py-3 md:px-8 md:py-4 text-white uppercase font-bold"
          >
            {">>>"} TRY AGAIN {"<<<"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ResultsPage;
