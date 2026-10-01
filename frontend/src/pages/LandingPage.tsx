import React from 'react';
import { HeroSection } from '../components/landing/HeroSection';
import { ValuePropSection } from '../components/landing/ValuePropSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { ScenarioCards } from '../components/landing/ScenarioCards';
import { NotAChatbotSection } from '../components/landing/NotAChatbotSection';
import { CallToAction } from '../components/landing/CallToAction';
import { CategoryType } from '../types';

interface LandingPageProps {
  onStart: () => void;
  onSelectScenario: (category: CategoryType, text: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onSelectScenario }) => {
  return (
    <div className="space-y-12">
      <HeroSection onStart={onStart} onDemo={onStart} />
      <ValuePropSection />
      <HowItWorksSection />
      <ScenarioCards onSelectScenario={onSelectScenario} />
      <NotAChatbotSection />
      <CallToAction onStart={onStart} />
    </div>
  );
};
