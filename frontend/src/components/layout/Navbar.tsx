import React, { useState } from 'react';
import { Network, PlusCircle, LayoutDashboard, FileSearch, GitFork, ShieldAlert, CheckCircle2, History as HistoryIcon, Menu, X, Sparkles } from 'lucide-react';
import { DemoBadge } from '../common/DemoBadge';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'landing', label: 'Overview', icon: Sparkles },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'new', label: 'New Investigation', icon: PlusCircle },
    { id: 'workspace', label: 'Workspace', icon: FileSearch },
    { id: 'graph', label: 'Problem Graph', icon: GitFork },
    { id: 'evidence', label: 'Evidence', icon: ShieldAlert },
    { id: 'actions', label: 'Action Center', icon: CheckCircle2 },
    { id: 'history', label: 'History', icon: HistoryIcon },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-darkBg/80 backdrop-blur-xl border-b border-cardBorder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Tagline */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('landing')}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Network className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                  BHARAT PROBLEM SOLVER
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  AGENTIC AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Report the symptom. Discover the problem behind it.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right Status Badge & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <DemoBadge />
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-cardBorder bg-cardBg/95 backdrop-blur-xl px-4 pt-2 pb-4 space-y-1">
          <div className="py-2 sm:hidden">
            <DemoBadge />
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 text-slate-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
