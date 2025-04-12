
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { questions, Question } from '@/data/questions';
import { motion, AnimatePresence } from 'framer-motion';

interface TestPageProps {
  onComplete: (answers: boolean[]) => void;
}

const TestPage: React.FC<TestPageProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (questionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = !newAnswers[questionIndex];
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate a "processing" delay for nostalgic effect
    setTimeout(() => {
      onComplete(answers);
    }, 2000);
  };

  return (
    <motion.div 
      className="min-h-screen py-8 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="y2k-container max-w-3xl mx-auto">
        <h1 className="y2k-title mb-8">
          <span className="text-shadow-y2k">QUIZ TIME!</span>
        </h1>
        
        <div className="bg-white/70 rounded-lg p-4 mb-6 font-comic text-center border-4 border-dashed border-y2k-blue">
          <p className="text-y2k-purple text-xl">
            Answer YES to the statements that apply to you!
          </p>
          <p className="text-y2k-hotpink text-sm mt-2">
            BE HONEST... the quiz knows if you're lying!! 👀
          </p>
        </div>

        <AnimatePresence>
          {isSubmitting ? (
            <motion.div 
              className="text-center p-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="bg-white/80 rounded-xl p-6 border-4 border-y2k-hotpink">
                <h2 className="text-3xl font-pixel text-y2k-blue mb-4">PROCESSING...</h2>
                <div className="flex justify-center">
                  <div className="w-6 h-6 bg-y2k-lime rounded-full mx-1 animate-bounce" style={{ animationDelay: "0s" }}></div>
                  <div className="w-6 h-6 bg-y2k-hotpink rounded-full mx-1 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-6 h-6 bg-y2k-blue rounded-full mx-1 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
                <p className="mt-4 text-y2k-purple font-comic text-sm">
                  Our super advanced AI is analyzing your personality...
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {questions.map((question, index) => (
                <motion.div 
                  key={question.id}
                  className="y2k-tile flex items-start gap-3"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex-shrink-0 pt-1">
                    <input
                      type="checkbox"
                      id={`question-${question.id}`}
                      checked={answers[index]}
                      onChange={() => handleCheckboxChange(index)}
                      className="y2k-checkbox"
                    />
                  </div>
                  <label
                    htmlFor={`question-${question.id}`}
                    className="flex-grow y2k-checkbox-label"
                  >
                    {question.text}
                  </label>
                </motion.div>
              ))}
              
              <motion.div 
                className="mt-8 text-center"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Button 
                  onClick={handleSubmit} 
                  className="y2k-button text-2xl px-8 py-4 text-white uppercase font-bold"
                >
                  {">>>"} DONE {"<<<"}
                </Button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TestPage;
