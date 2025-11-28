import { Shield, ArrowRight, Brain, TrendingUp, Lock, Target, Activity, Lightbulb, BookOpen } from 'lucide-react';
import Navbar from '../layout/Navbar';
import ArchitectureSection from '../features/ArchitectureSection';

const LandingPage = ({ onStartDemo }) => (
  <div className="min-h-screen bg-[#F5F5F7] font-sans text-slate-900 selection:bg-orange-200 scroll-smooth">
    
    {/* 1. Premium Navbar */}
    <Navbar onHome={() => window.scrollTo(0,0)} showTryButton={true} onStartDemo={onStartDemo} />

    {/* 2. Hero Section (Apple Style) */}
    <section className="pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-8 animate-fade-in">
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
        Psychobehavioral Finance Engine
      </div>
      
      {/* HINDI TAGLINE - PREMIUM TYPOGRAPHY */}
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-slate-900 mb-6 leading-[1.1]">
        Paisa Bachayega? <br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
          Ya Main Ghar Aaaun?
        </span>
      </h1>
      
      <p className="text-xl md:text-2xl text-slate-500 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
        The first banking agent that enforces discipline like a 
        <span className="text-slate-900 font-bold"> Vasooli Bhai</span>. 
        We use fear appeals to ensure you never miss rent.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative mt-12 mb-20">
        
        <button 
          onClick={onStartDemo}
          className="relative px-12 py-6 bg-slate-900 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-slate-900/40 hover:scale-105 transition-transform flex items-center gap-3 border-4 border-white/10 z-10"
        >
          Launch Prototype <ArrowRight size={24} />
        </button>

        {/* --- JUDGE POINTER --- */}
        <div className="absolute top-full mt-6 animate-bounce z-20 pointer-events-none">
           <div className="bg-yellow-400 text-black text-xs font-black px-4 py-2 rounded-lg shadow-xl border-2 border-black -rotate-3 flex flex-col items-center relative">
             <div className="w-0 h-0 border-l-[8px] border-l-transparent border-b-[10px] border-b-black border-r-[8px] border-r-transparent absolute -top-[12px] left-1/2 -translate-x-1/2"></div>
             <span>👨‍⚖️ JUDGES</span>
             <span className="text-[10px] font-bold uppercase tracking-wider">Click Above to Start</span>
           </div>
        </div>

      </div>
    </section>

    {/* 3. AGENT PROTOCOL (TOP PRIORITY) */}
    <section id="agent" className="py-24 px-6 max-w-screen-xl mx-auto">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1 h-8 bg-slate-900"></div>
        <h2 className="text-2xl font-bold uppercase tracking-widest text-slate-900">The Agent Protocol</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
        {/* Card 1: The Persona */}
        <div className="md:col-span-2 md:row-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 flex flex-col justify-between overflow-hidden relative group hover:border-slate-200 transition-all">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4 tracking-tight">Meet Vasooli Bhai.</h3>
            <p className="text-slate-500 text-lg max-w-md leading-relaxed">
              Standard banking apps are polite. Ours is rude. We use <b>Fear Appeals</b> and <b>Nudging</b>. If you overspend, the agent switches from "Advisor" to "Recovery Agent" mode instantly.
            </p>
          </div>
          <div className="mt-10 relative z-10 bg-slate-50 rounded-3xl p-6 border border-slate-100 shadow-inner">
             <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold shrink-0">VB</div>
                <div className="space-y-2">
                   <p className="text-sm font-semibold text-slate-900">Agent Analysis</p>
                   <p className="text-xl md:text-2xl font-bold text-red-600 leading-tight">
                     "Oye! You just spent ₹200 on Coffee? Rent is due tomorrow. Transaction Blocked."
                   </p>
                </div>
             </div>
          </div>
        </div>

        {/* Card 2: Mental Accounting */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-4 right-4 text-slate-200 group-hover:text-orange-100 transition-colors">
            <TrendingUp size={80} />
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Cognitive Control</p>
          <h3 className="text-4xl font-bold text-slate-900 mb-1">Nudging</h3>
          <p className="text-slate-500 font-medium">Libertarian Paternalism via Defaults</p>
        </div>

        {/* Card 3: The Lie */}
        <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-sm flex flex-col justify-between text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
          <div className="relative z-10">
            <Lock className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Cognitive Partitioning</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              We violate economic fungibility. We physically lock rent money so you can't see it.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* 4. PHILOSOPHY */}
    <section id="philosophy" className="py-24 bg-white border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <Brain size={48} className="mx-auto text-slate-300 mb-6" />
          <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-6">The Irrationality of Economic Cognition.</h2>
          <p className="text-xl text-slate-500 leading-relaxed">
            Financial decisions are seldom logical. They are driven by <span className="text-slate-900 font-semibold">Temporal Myopia</span> (blindness to the future) and <span className="text-slate-900 font-semibold">Conative Dissonance</span> (failure to act on goals). 
            <br/><br/>
            We don't seek to correct your irrationality. <br/>
            <span className="text-orange-600 font-bold">We model it, then we weaponize it against your bad habits.</span>
          </p>
        </div>
      </div>
    </section>

    {/* 5. BLUEPRINT (MATH & PSYCHOLOGY) */}
    <ArchitectureSection />

    {/* 6. RESEARCH (DEEP DIVE) */}
    <section id="research" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 text-orange-600 font-bold mb-2 uppercase tracking-wider text-sm">
              <BookOpen size={16} /> Research Framework
            </div>
            <h2 className="text-4xl font-bold text-slate-900">Psychometric Constructs</h2>
          </div>
          <p className="text-slate-500 max-w-md text-sm md:text-right">
            Based on the paper "A Psycho-behavioral Framework for Modeling Financial Decision-Making and Well-Being".
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><Target size={24} /></div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">IGI Score</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">Immediate Gratification Index. Weighted score of impulsive vs planned spending.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-6"><Activity size={24} /></div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Conative Dissonance</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">The gap between stated goals and actual behavior (Streak Consistency).</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6"><Lightbulb size={24} /></div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Sunk Cost Breaker</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">Interrupts escalation of commitment to failing assets or subscriptions.</p>
          </div>
        </div>
      </div>
    </section>

    <footer className="py-12 text-center text-slate-400 text-sm font-medium bg-white border-t border-slate-100">
      Designed for Agentic AI Hackathon • 2024 • Team Mavericks
    </footer>
  </div>
);

export default LandingPage;

