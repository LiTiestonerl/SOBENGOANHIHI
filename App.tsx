import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Background from './components/Background';
import { QuizData } from './types';
import { WelcomeStep, BasicsStep, VibeCheckStep, SituationStep, DeepStep, FinaleStep } from './components/WizardSteps';

const initialData: QuizData = {
  nickname: '',
  birthday: '',
  drink: '',
  style: '',
  angryAction: '',
  weekend: '',
  crushFactor: ''
};

export default function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<QuizData>(initialData);

  const updateData = (fields: Partial<QuizData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  return (
    <>
      <Background />
      <div className="min-h-screen w-full flex items-center justify-center font-body selection:bg-pink-200">
        <main className="relative z-10 w-full max-w-md mx-auto min-h-[600px] flex items-center justify-center p-4">
          <motion.div 
            layout
            className="w-full bg-glass backdrop-blur-xl rounded-[2rem] border border-glassBorder shadow-[0_8px_32px_0_rgba(255,143,171,0.2)] p-6 md:p-8 flex flex-col items-center min-h-[500px] justify-center relative overflow-hidden"
          >
            {/* Progress Bar (Visible after welcome) */}
            {step > 0 && step < 6 && (
               <div className="absolute top-0 left-0 w-full h-2 bg-white/20">
                 <motion.div 
                   className="h-full bg-secondary"
                   initial={{ width: 0 }}
                   animate={{ width: `${(step / 5) * 100}%` }}
                   transition={{ duration: 0.5 }}
                 />
               </div>
            )}

            <AnimatePresence mode="wait">
              {step === 0 && <WelcomeStep key="step0" onStart={nextStep} />}
              {step === 1 && <BasicsStep key="step1" data={data} updateData={updateData} onNext={nextStep} />}
              {step === 2 && <VibeCheckStep key="step2" data={data} updateData={updateData} onNext={nextStep} />}
              {step === 3 && <SituationStep key="step3" data={data} updateData={updateData} onNext={nextStep} />}
              {step === 4 && <DeepStep key="step4" data={data} updateData={updateData} onNext={nextStep} />}
              {step === 5 && <FinaleStep key="step5" data={data} />}
            </AnimatePresence>

          </motion.div>
          
          {/* Footer Branding */}
          <div className="fixed bottom-4 text-center w-full text-gray-500/50 text-xs font-heading">
            From Minhh Tiếnn with a big 💖 for you
          </div>
        </main>
      </div>
    </>
  );
}