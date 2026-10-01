import React from 'react';
import { UniversalProblemInput } from '../components/input/UniversalProblemInput';
import { CategoryType } from '../types';
import { Sparkles, Bus, Trash2, TrafficCone, Droplet, Building2, Stethoscope } from 'lucide-react';

interface NewInvestigationPageProps {
  onSubmit: (text: string, category?: CategoryType, location?: string) => void;
  initialText?: string;
  initialCategory?: CategoryType;
}

export const NewInvestigationPage: React.FC<NewInvestigationPageProps> = ({
  onSubmit,
  initialText = '',
  initialCategory
}) => {
  const sampleScenarios = [
    { cat: 'water' as CategoryType, text: 'There is water flooding the road near my apartment.', icon: Droplet, label: 'Water Leak' },
    { cat: 'bus' as CategoryType, text: "The bus hasn't arrived at my stop for 40 minutes.", icon: Bus, label: 'Bus Delay' },
    { cat: 'garbage' as CategoryType, text: "Garbage hasn't been collected in our street for three days.", icon: Trash2, label: 'Garbage Accumulation' },
    { cat: 'traffic' as CategoryType, text: "Traffic near my college is unusually heavy.", icon: TrafficCone, label: 'Traffic Jam' },
    { cat: 'apartment' as CategoryType, text: "The lift in our apartment keeps breaking down.", icon: Building2, label: 'Apartment Lift Breakdown' },
    { cat: 'hospital' as CategoryType, text: "I've been waiting for my appointment for two hours.", icon: Stethoscope, label: 'Hospital OPD Wait' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded bg-cyan-950 border border-cyan-800">
          NEW INVESTIGATION WORKSPACE
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-2">
          Report Any Civic Symptom
        </h1>
        <p className="text-slate-300 text-sm sm:text-base">
          Our Agentic AI will classify the domain, call telemetry tools, build a Problem Graph, and discover the systemic causes behind it.
        </p>
      </div>

      <UniversalProblemInput
        onSubmit={onSubmit}
        initialText={initialText}
        initialCategory={initialCategory}
      />

      {/* Quick Scenario Fill Pills */}
      <div className="max-w-4xl mx-auto p-6 rounded-2xl glass-panel bg-cardBg/80 border border-cardBorder text-center">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase block mb-4">
          OR QUICK-FILL A HACKATHON DEMO SCENARIO:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {sampleScenarios.map((sc, idx) => {
            const Icon = sc.icon;
            return (
              <button
                key={idx}
                onClick={() => onSubmit(sc.text, sc.cat, 'Bengaluru Urban')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-slate-300 hover:text-white text-xs font-medium transition-all"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{sc.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
