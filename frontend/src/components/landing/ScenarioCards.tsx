import React from 'react';
import { Bus, Trash2, TrafficCone, Droplet, Building2, Stethoscope, ArrowRight } from 'lucide-react';
import { CategoryType } from '../../types';

interface ScenarioCardsProps {
  onSelectScenario: (category: CategoryType, text: string) => void;
}

export const ScenarioCards: React.FC<ScenarioCardsProps> = ({ onSelectScenario }) => {
  const cards = [
    {
      category: 'bus' as CategoryType,
      title: 'Bus / Public Transport',
      icon: Bus,
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      example: "“The bus hasn't arrived at my stop for 40 minutes.”",
      investigationChain: "Road Incident → Outer Ring Road Traffic → Route 500-D Disruption → 250 Passengers Affected"
    },
    {
      category: 'garbage' as CategoryType,
      title: 'Garbage / Waste Collection',
      icon: Trash2,
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      example: "“Garbage hasn't been collected in our street for three days.”",
      investigationChain: "Vehicle Breakdown → Sector 3 Missed Collection → 450kg Waste Accumulation → Public Health Risk"
    },
    {
      category: 'traffic' as CategoryType,
      title: 'Traffic / Road Congestion',
      icon: TrafficCone,
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      example: "“Traffic near my college is unusually heavy.”",
      investigationChain: "Signal #4 Short Circuit → 1.4km Gridlock Tailback → Student Transit Delay"
    },
    {
      category: 'water' as CategoryType,
      title: 'Water Leakage / Supply',
      icon: Droplet,
      badgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      example: "“Water is leaking onto the road outside my apartment.”",
      investigationChain: "Feeder Line 4B Burst → 300m Road Flooding → Traffic Congestion → Bus Delay"
    },
    {
      category: 'apartment' as CategoryType,
      title: 'Apartment / Residential',
      icon: Building2,
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      example: "“The lift in our apartment keeps breaking down.”",
      investigationChain: "Defective Inverter Board → 4-Month Outage History → 75 Residents Stranded"
    },
    {
      category: 'hospital' as CategoryType,
      title: 'Hospital Queue / Wait Time',
      icon: Stethoscope,
      badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
      example: "“I've been waiting for my appointment for two hours.”",
      investigationChain: "Trauma ER Emergency Diversion → OPD Staff Deficit → 135m Wait Time Surge"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-widest px-3 py-1 rounded bg-blue-950/60 border border-blue-800">
          6 REAL-WORLD SCENARIOS
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
          Powered by One Universal AI Engine
        </h2>
        <p className="text-slate-300 text-base leading-relaxed">
          Select any real-world problem scenario to watch the AI agent investigate connected issues, correlate evidence, build a Problem Graph, and generate actionable solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.category}
              className="p-6 rounded-2xl glass-panel bg-cardBg/90 border border-cardBorder hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl border ${card.badgeColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border uppercase ${card.badgeColor}`}>
                    {card.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-cardBorder/60 mb-4">
                  <p className="text-xs font-medium text-amber-300 italic">
                    {card.example}
                  </p>
                </div>

                <div className="text-[11px] font-mono text-slate-400 space-y-1 mb-6">
                  <span className="text-slate-500 font-semibold block uppercase">Discovered Chain:</span>
                  <p className="text-slate-300 leading-snug">{card.investigationChain}</p>
                </div>
              </div>

              <button
                onClick={() => onSelectScenario(card.category, card.example.replace(/“|”/g, ''))}
                className="w-full py-3 px-4 rounded-xl bg-slate-800/80 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-cyan-500/20"
              >
                <span>Investigate Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
