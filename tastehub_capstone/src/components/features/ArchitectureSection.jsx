import React, { useState } from 'react';
import { Sigma, Calculator, Target, ArrowRight, ArrowLeft, Brain, GitMerge, Zap, Workflow } from 'lucide-react';
import BatteryWarning from '../ui/BatteryWarning';

const ArchitectureSection = () => {
  const [activeTab, setActiveTab] = useState('math'); // 'math' or 'psych'

  // RENDER MATH FLOW (Based on Mathematical_Research.pdf)
  const renderMathFlow = () => (
    <div className="relative max-w-4xl mx-auto py-12">
      {/* --- ROW 1: LEFT TO RIGHT --- */}
      <div className="flex flex-col md:flex-row gap-8 items-stretch relative z-10">
        
        {/* Card 1: Input Metrics */}
        <div className="flex-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-2xl"><Sigma size={20}/></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step 01</span>
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Input Metrics</h3>
          <p className="text-sm text-slate-500 mb-4">
            Quantifying saving consistency (GCS) and budgeting accuracy (BAS).
          </p>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-[10px] text-slate-600 space-y-1">
            <p>GCS = Streak / Total Months</p>
            <p>BAS = 1 - |Plan - Actual|</p>
          </div>
        </div>

        {/* Connector 1 (Desktop) */}
        <div className="hidden md:flex items-center justify-center w-12 relative">
           <div className="h-1 w-full bg-slate-200"></div>
           <ArrowRight className="absolute text-slate-300 bg-white rounded-full p-1" size={24}/>
        </div>

        {/* Card 2: Indices */}
        <div className="flex-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-2xl"><Calculator size={20}/></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Step 02</span>
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Core Indices</h3>
          <p className="text-sm text-slate-500 mb-4">
            We calculate "Potential" vs "Risk" factors.
          </p>
          <div className="space-y-2">
             <div className="flex justify-between items-center text-xs font-medium text-slate-600 border-b border-slate-100 pb-1">
               <span>SRI (Self-Regulation)</span>
               <span className="text-green-600">Potential</span>
             </div>
             <div className="flex justify-between items-center text-xs font-medium text-slate-600">
               <span>VI (Vulnerability)</span>
               <span className="text-red-600">Risk</span>
             </div>
          </div>
        </div>
      </div>

      {/* --- CONNECTOR CURVE: RIGHT SIDE DOWN --- */}
      <div className="hidden md:block h-16 w-full relative">
        <div className="absolute right-[16%] top-0 w-1 h-full bg-slate-200"></div>
        <div className="absolute right-[16%] bottom-0 w-full h-1 bg-slate-200" style={{width: '68%'}}></div>
        <div className="absolute right-[16%] top-0 w-4 h-4 bg-slate-200 rounded-full -translate-y-1.5 -translate-x-1.5"></div>
      </div>

      {/* --- ROW 2: RIGHT TO LEFT --- */}
      <div className="flex flex-col md:flex-row-reverse gap-8 items-stretch relative z-10 pt-8 md:pt-0">
        
        {/* Card 3: Cobb-Douglas */}
        <div className="flex-1 bg-slate-900 text-white p-8 rounded-3xl shadow-xl hover:scale-105 transition-transform group relative overflow-hidden">
          {/* Shine Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="bg-slate-800 text-orange-500 p-3 rounded-2xl"><Target size={20}/></div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Step 03 (Final)</span>
          </div>
          <h3 className="font-bold text-2xl mb-2 relative z-10">The FRS Score</h3>
          <p className="text-sm text-slate-400 mb-6 relative z-10">
            The Financial Resilience Score (0-100).
          </p>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 font-mono text-sm text-orange-400 relative z-10 text-center">
            FRS = 100 · (SRI)<sup>λ</sup> · (1-VI)<sup>1-λ</sup>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 text-center relative z-10">
            Based on Cobb-Douglas Production Function
          </p>
        </div>

        {/* Connector 2 (Desktop) */}
        <div className="hidden md:flex items-center justify-center w-12 relative">
           <div className="h-1 w-full bg-slate-200"></div>
           <ArrowLeft className="absolute text-slate-300 bg-white rounded-full p-1" size={24}/>
        </div>

        {/* Card 4: Ego Depletion (Context) */}
        <div className="flex-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all group opacity-70 hover:opacity-100">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 text-red-600 p-3 rounded-2xl"><BatteryWarning size={20}/></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Context</span>
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Dynamic Fatigue (DFS)</h3>
          <p className="text-sm text-slate-500 mb-4">
            We model "Ego Depletion" (Willpower Decay) to time nudges effectively.
          </p>
          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 w-3/4"></div>
          </div>
        </div>

      </div>
    </div>
  );

  // RENDER PSYCH FLOW (Based on Psychological_Research.pdf)
  const renderPsychFlow = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 relative">
      {/* Connecting Line */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0 hidden md:block"></div>

      {[
        { 
          icon: <Brain size={28} />, color: 'text-rose-600', bg: 'bg-rose-50', 
          title: 'Temporal Myopia', 
          desc: 'The cognitive bias where users heavily discount future rewards (paying rent) for immediate pleasure.',
          tag: 'COGNITIVE BIAS'
        },
        { 
          icon: <GitMerge size={28} />, color: 'text-amber-600', bg: 'bg-amber-50', 
          title: 'Conative Dissonance', 
          desc: 'The gap between "Goal Commitment" (I want to save) and actual behavior. We measure this via Streaks.',
          tag: 'BEHAVIORAL CONFLICT'
        },
        { 
          icon: <Zap size={28} />, color: 'text-emerald-600', bg: 'bg-emerald-50', 
          title: 'Nudging Architecture', 
          desc: 'Libertarian Paternalism. We change the "Default Choice" via Cognitive Partitioning (Locking funds).',
          tag: 'INTERVENTION'
        }
      ].map((item, i) => (
        <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center`}>
              {React.cloneElement(item.icon, { strokeWidth: 1.5 })}
            </div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-md">{item.tag}</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  );

  return (
    <section id="blueprint" className="py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest mb-6 shadow-xl shadow-slate-900/10">
            <Workflow size={14} /> System Blueprint
          </div>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-slate-900 mb-6">
            The Logic. The Math. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">The Architecture.</span>
          </h2>
          
          <div className="inline-flex bg-slate-100 p-1.5 rounded-full relative">
            {['math', 'psych'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 z-10 ${
                  activeTab === tab 
                    ? 'bg-white text-slate-900 shadow-md transform scale-105' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab === 'math' && 'Mathematical Model'}
                {tab === 'psych' && 'Psychology'}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[500px] animate-in fade-in slide-in-from-bottom-8 duration-700">
          {activeTab === 'math' && renderMathFlow()}
          {activeTab === 'psych' && renderPsychFlow()}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureSection;

