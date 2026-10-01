import React, { useState } from 'react';
import { Mic, Image as ImageIcon, MapPin, Search, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { CategoryType } from '../../types';

interface UniversalProblemInputProps {
  onSubmit: (text: string, category?: CategoryType, location?: string) => void;
  initialText?: string;
  initialCategory?: CategoryType;
}

export const UniversalProblemInput: React.FC<UniversalProblemInputProps> = ({
  onSubmit,
  initialText = '',
  initialCategory
}) => {
  const [inputText, setInputText] = useState(initialText);
  const [location, setLocation] = useState('Koramangala, Bengaluru');
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Auto-classify category on the fly
  const detectCategory = (text: string): CategoryType => {
    if (initialCategory) return initialCategory;
    const t = text.toLowerCase();
    if (t.includes('water') || t.includes('leak') || t.includes('flood') || t.includes('pipe')) return 'water';
    if (t.includes('bus') || t.includes('stop') || t.includes('route') || t.includes('transit')) return 'bus';
    if (t.includes('garbage') || t.includes('waste') || t.includes('trash') || t.includes('smell')) return 'garbage';
    if (t.includes('traffic') || t.includes('jam') || t.includes('signal') || t.includes('road')) return 'traffic';
    if (t.includes('lift') || t.includes('elevator') || t.includes('apartment') || t.includes('flats')) return 'apartment';
    if (t.includes('hospital') || t.includes('doctor') || t.includes('opd') || t.includes('wait') || t.includes('appointment')) return 'hospital';
    return 'water';
  };

  const currentCategory = detectCategory(inputText);

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setInputText("Water is leaking onto the road outside my apartment near Koramangala.");
        setIsRecording(false);
      }, 2500);
    }
  };

  const handleMockImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      if (!inputText) {
        setInputText("Garbage hasn't been collected in our street for three days.");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSubmit(inputText, currentCategory, location);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl glass-panel-glow bg-cardBg/95 border border-cardBorder shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            UNIVERSAL CIVIC INPUT ENGINE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            What problem are you facing?
          </h2>
        </div>

        {/* Category Auto-Classification Pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-cardBorder">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">AUTO CLASSIFIED:</span>
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
            {currentCategory}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Main Textarea */}
        <div className="relative">
          <textarea
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe the problem in your own words... e.g. 'The bus hasn't arrived at my stop for 40 minutes' or 'Water is leaking onto the road near my apartment'"
            className="w-full p-4 rounded-2xl bg-slate-950 border border-cardBorder text-slate-100 placeholder-slate-500 text-sm sm:text-base focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none font-sans"
          />

          {isRecording && (
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-cyan-950/90 border border-cyan-500/50 flex items-center justify-between text-cyan-300 text-xs font-mono animate-pulse">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                Listening... Speak your civic complaint clearly.
              </span>
              <button 
                type="button"
                onClick={() => setIsRecording(false)} 
                className="text-cyan-400 underline font-bold"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Selected Image Preview */}
        {selectedImage && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
            <img src={selectedImage} alt="Problem evidence preview" className="w-12 h-12 object-cover rounded-lg" />
            <div className="flex-1 text-xs">
              <span className="text-slate-200 font-semibold block">Photo Evidence Attached</span>
              <span className="text-slate-400 font-mono">Image metadata extracted • Location verified</span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="text-xs text-rose-400 hover:underline"
            >
              Remove
            </button>
          </div>
        )}

        {/* Controls Toolbar: Voice, Image, Location, Submit */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex flex-wrap items-center gap-2">
            {/* Voice UI Button */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                isRecording
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/50'
                  : 'bg-slate-900/80 text-slate-300 border-cardBorder hover:border-slate-600'
              }`}
            >
              <Mic className={`w-4 h-4 ${isRecording ? 'animate-bounce text-rose-400' : 'text-slate-400'}`} />
              <span>{isRecording ? 'Recording...' : 'Voice Input'}</span>
            </button>

            {/* Image Upload UI */}
            <label className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-slate-900/80 text-slate-300 border border-cardBorder hover:border-slate-600 cursor-pointer transition-all">
              <ImageIcon className="w-4 h-4 text-slate-400" />
              <span>Attach Photo</span>
              <input type="file" accept="image/*" onChange={handleMockImageUpload} className="hidden" />
            </label>

            {/* Location Selector */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-slate-900/80 text-slate-300 border border-cardBorder">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-transparent text-slate-200 outline-none text-xs cursor-pointer font-sans"
              >
                <option value="Koramangala, Bengaluru" className="bg-slate-900 text-slate-200">Koramangala, Bengaluru</option>
                <option value="Silk Board Junction, Bengaluru" className="bg-slate-900 text-slate-200">Silk Board Junction, Bengaluru</option>
                <option value="HSR Layout Ward 174, Bengaluru" className="bg-slate-900 text-slate-200">HSR Layout Ward 174, Bengaluru</option>
                <option value="Indiranagar College Cross, Bengaluru" className="bg-slate-900 text-slate-200">Indiranagar College Cross, Bengaluru</option>
                <option value="Sunrise Heights, Whitefield" className="bg-slate-900 text-slate-200">Sunrise Heights, Whitefield</option>
                <option value="City General Hospital, Bengaluru" className="bg-slate-900 text-slate-200">City General Hospital, Bengaluru</option>
              </select>
            </div>
          </div>

          {/* Submit Action Button */}
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>INVESTIGATE</span>
          </button>
        </div>
      </form>
    </div>
  );
};
