import React, { useState } from 'react';
import { Search, Filter, ArrowRight, Clock, Tag } from 'lucide-react';
import { Investigation, CategoryType } from '../types';

interface HistoryPageProps {
  investigations: Investigation[];
  onSelectInvestigation: (inv: Investigation) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  investigations,
  onSelectInvestigation
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: 'All Categories' },
    { key: 'bus', label: '🚌 Bus' },
    { key: 'garbage', label: '🗑️ Garbage' },
    { key: 'traffic', label: '🚦 Traffic' },
    { key: 'water', label: '💧 Water' },
    { key: 'apartment', label: '🏢 Apartment' },
    { key: 'hospital', label: '🏥 Hospital' },
  ];

  const filtered = investigations.filter((inv) => {
    const matchesSearch =
      !search ||
      inv.title.toLowerCase().includes(search.toLowerCase()) ||
      inv.input_text.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase()) ||
      inv.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || inv.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'all' || inv.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-widest">
          INVESTIGATION ARCHIVE
        </span>
        <h1 className="text-3xl font-extrabold text-white mt-1">
          Historical Investigations
        </h1>
        <p className="text-slate-300 text-sm">
          Search, filter, and inspect past problem graphs, correlated evidence, and telemetry outcomes.
        </p>
      </div>

      {/* Global Search & Filters Toolbar */}
      <div className="p-4 rounded-2xl glass-panel bg-cardBg/90 border border-cardBorder space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by ID, problem keyword, location, or status..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-cardBorder text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-cardBorder/60">
          <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mr-2">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                selectedCategory === cat.key
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Investigations List Grid */}
      <div className="space-y-4">
        {filtered.map((inv) => (
          <div
            key={inv.id}
            onClick={() => onSelectInvestigation(inv)}
            className="p-5 rounded-2xl glass-panel bg-cardBg/90 border border-cardBorder hover:border-cyan-500/40 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  {inv.id}
                </span>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800 uppercase">
                  {inv.category}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {new Date(inv.created_at).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                {inv.title}
              </h3>
              <p className="text-xs text-slate-300 italic font-sans">“{inv.input_text}”</p>

              {inv.root_cause && (
                <p className="text-xs font-mono text-purple-300 pt-1">
                  Root Cause: {inv.root_cause.title} ({inv.root_cause.confidence} Confidence)
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <span className={`text-xs font-mono font-bold px-3 py-1 rounded border uppercase ${
                inv.status === 'RESOLVED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}>
                {inv.status}
              </span>

              <div className="p-2.5 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800 group-hover:bg-cyan-500 group-hover:text-white transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="p-12 text-center text-slate-400 font-mono text-xs">
            No investigations match search filter.
          </div>
        )}
      </div>
    </div>
  );
};
