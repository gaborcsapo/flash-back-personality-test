
import React, { useState } from 'react';
import WelcomePage from '@/components/WelcomePage';
import TestPage from '@/components/TestPage';
import ResultsPage from '@/components/ResultsPage';
import { AnimatePresence } from 'framer-motion';

// Define the app states
enum AppState {
  WELCOME,
  TEST,
  RESULTS
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>(AppState.WELCOME);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const handleStartTest = () => {
    setAppState(AppState.TEST);
  };

  const handleTestComplete = (testAnswers: boolean[]) => {
    setAnswers(testAnswers);
    setAppState(AppState.RESULTS);
  };

  const handleRestart = () => {
    setAppState(AppState.WELCOME);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {appState === AppState.WELCOME && (
          <WelcomePage key="welcome" onStartTest={handleStartTest} />
        )}
        
        {appState === AppState.TEST && (
          <TestPage key="test" onComplete={handleTestComplete} />
        )}
        
        {appState === AppState.RESULTS && (
          <ResultsPage key="results" answers={answers} onRestart={handleRestart} />
        )}
      </AnimatePresence>

      {/* Y2K Footer Elements */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/50 text-center py-1 font-pixel text-xs text-y2k-blue">
        <div className="animate-bounce-horizontal">
          {[...Array(20)].map((_, i) => (
            <span key={i}>★</span>
          ))}
          {" "}BEST VIEWED AT 800x600{" "}
          {[...Array(20)].map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
