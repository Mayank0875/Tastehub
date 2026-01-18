import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Play, Pause, CheckCircle, Lock, ChevronLeft, HelpCircle, FileText, ArrowRight, Zap, Trophy, Database, Code, Layout, Server, ThumbsUp, Share2, Bookmark, MoreHorizontal, Download, Smile, Frown, Meh, Sparkles } from 'lucide-react';

// --- 1. DATA: 12 Modules (Full Course) ---
const MODULES = [
  { id: 1, title: "Course Orientation", desc: "Setup VS Code & Git environment.", time: "15 min", status: "completed", type: "setup" },
  { id: 2, title: "HTML5 Structure", desc: "Semantic tags, SEO, and accessibility.", time: "45 min", status: "completed", type: "code" },
  { id: 3, title: "CSS Box Model", desc: "Padding, Margin, Borders & Reset.", time: "1h 10m", status: "completed", type: "code" },
  { id: 4, title: "Flexbox Layouts", desc: "Building responsive rows and columns.", time: "50 min", status: "completed", type: "layout" },
  { id: 5, title: "CSS Grid Mastery", desc: "Complex 2D Layout systems.", time: "1h 30m", status: "current", type: "layout" },
  { id: 6, title: "JavaScript Basics", desc: "Variables, Data Types & Operators.", time: "1h 15m", status: "locked", type: "code" },
  { id: 7, title: "Control Flow", desc: "If/Else logic, Switches & Loops.", time: "45 min", status: "locked", type: "code" },
  { id: 8, title: "DOM Manipulation", desc: "Interactive web pages & Events.", time: "2h 00m", status: "locked", type: "code" },
  { id: 9, title: "Async/Await", desc: "Fetching API data & Promises.", time: "1h 45m", status: "locked", type: "data" },
  { id: 10, title: "React Components", desc: "Props, State & Component Lifecycle.", time: "2h 30m", status: "locked", type: "code" },
  { id: 11, title: "Node.js Backend", desc: "Express server & REST APIs.", time: "1h 50m", status: "locked", type: "server" },
  { id: 12, title: "Final Capstone", desc: "Build a Full Stack Netflix Clone.", time: "5h 00m", status: "locked", type: "project" },
];

// --- 2. COMPONENT: Snake Roadmap (Auto-Aligning) ---
const SnakeRoadmap = ({ onSelect }) => {
  const cardRefs = useRef([]);
  const [svgPath, setSvgPath] = useState("");

  const calculatePath = () => {
    if (cardRefs.current.length < 2) return;
    let path = "";
    for (let i = 0; i < MODULES.length - 1; i++) {
      const current = cardRefs.current[i];
      const next = cardRefs.current[i + 1];
      if (!current || !next) continue;
      const startX = current.offsetLeft + (current.offsetWidth / 2);
      const startY = current.offsetTop + (current.offsetHeight / 2);
      const endX = next.offsetLeft + (next.offsetWidth / 2);
      const endY = next.offsetTop + (next.offsetHeight / 2);
      const distY = endY - startY;
      if (i === 0) path += `M ${startX} ${startY} `;
      path += `C ${startX} ${startY + distY * 0.5}, ${endX} ${startY + distY * 0.5}, ${endX} ${endY} `;
    }
    setSvgPath(path);
  };

  useLayoutEffect(() => {
    calculatePath();
    window.addEventListener('resize', calculatePath);
    return () => window.removeEventListener('resize', calculatePath);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 relative font-sans overflow-x-hidden selection:bg-indigo-100 pb-20">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:40px_40px] opacity-40"></div>
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur border border-indigo-100 text-indigo-700 rounded-full text-xs font-bold mb-4 shadow-sm">
          <Trophy size={14} /> Level 5 Unlocked
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Full Stack Path</h1>
        <p className="text-slate-500 font-medium mt-2">12 Modules • 24 Hours Content</p>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8">
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible">
          <path d={svgPath} fill="none" stroke="white" strokeWidth="16" strokeOpacity="0.8" />
          <path d={svgPath} fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" strokeDasharray="12 12" className="transition-all duration-500" />
        </svg>

        <div className="flex flex-col gap-12 md:gap-16">
          {MODULES.map((mod, index) => {
            const isLeft = index % 2 === 0;
            const isLocked = mod.status === 'locked';
            const isCurrent = mod.status === 'current';
            return (
              <div key={mod.id} className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}>
                <div 
                  ref={el => cardRefs.current[index] = el}
                  onClick={() => !isLocked && onSelect(mod)}
                  className={`w-[90%] md:w-[48%] relative group cursor-pointer transition-all duration-300 ${isCurrent ? 'scale-[1.02] z-20' : 'hover:-translate-y-1 z-10'}`}
                >
                  <div className={`p-6 md:p-8 rounded-3xl border shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative bg-white ${isCurrent ? 'border-indigo-500 shadow-indigo-200/50 ring-4 ring-indigo-50' : 'border-slate-100 hover:border-indigo-200'} ${isLocked ? 'opacity-60 bg-slate-50 grayscale' : ''} ${mod.status === 'completed' ? 'border-emerald-400/50 bg-emerald-50/20' : ''}`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md mb-2 ${mod.status === 'completed' ? 'bg-emerald-500' : isCurrent ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                         {mod.type === 'code' ? <Code size={24} /> : mod.type === 'layout' ? <Layout size={24} /> : mod.type === 'data' ? <Database size={24} /> : mod.type === 'server' ? <Server size={24} /> : <Zap size={24} />}
                      </div>
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{mod.time}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-2">{mod.title}</h3>
                    <p className="text-slate-500 mb-6 text-sm leading-relaxed">{mod.desc}</p>
                    {!isLocked && (
                      <div className={`flex items-center text-sm font-bold transition-colors ${isCurrent ? 'text-indigo-600' : 'text-slate-400 group-hover:text-indigo-600'}`}>
                         {isCurrent ? 'Continue Learning' : 'Review Topic'} <ArrowRight size={16} className="ml-1" />
                      </div>
                    )}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-[3px] rounded-full z-30 ${isLeft ? '-right-[11px]' : '-left-[11px]'} ${mod.status === 'completed' ? 'border-emerald-500' : isCurrent ? 'border-indigo-600' : 'border-slate-300'}`}></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- 3. COMPONENT: Video Player with Animation & Toolbox ---
const VideoPlayer = ({ module, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showToolbox, setShowToolbox] = useState(false);
  const [hasReflected, setHasReflected] = useState(false); // Ensures toolbox only shows once
  const [feeling, setFeeling] = useState(null); // 'happy', 'neutral', 'confused'
  const [notes, setNotes] = useState('');

  // Video Simulation Logic
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          // --- THE TRIGGER POINT ---
          // Pause at 30% progress (approx 4 seconds in) to show Toolbox
          if (prev >= 30 && !hasReflected && !showToolbox) {
             setIsPlaying(false);
             setShowToolbox(true);
             return prev;
          }
          // Loop video for demo purposes if it hits end
          if (prev >= 100) return 0;
          
          return prev + 0.5; // Increment progress
        });
      }, 50); // Speed of simulation
    }
    return () => clearInterval(interval);
  }, [isPlaying, showToolbox, hasReflected]);

  const handleResume = () => {
    setHasReflected(true);
    setShowToolbox(false);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50 flex items-center px-4 md:px-8 justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition">
            <ChevronLeft size={24} />
          </button>
          <span className="font-extrabold text-slate-900 tracking-tight text-lg">Constellation.</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold">
            <Zap size={14} fill="currentColor" /> Streak: 5 Days
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Video */}
          <div className="lg:col-span-2">
            
            {/* VIDEO CONTAINER */}
            <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden relative shadow-2xl mb-6 group">
               
               {/* --- A. THE ANIMATED VIDEO BACKGROUND --- */}
               <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  {/* Background Gradient Layer */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black transition-all duration-1000 ${isPlaying ? 'scale-110' : 'scale-100'}`}></div>
                  
                  {/* Moving Shapes (Simulates Video Content) */}
                  {isPlaying && (
                    <>
                      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[80px] top-[-100px] left-[-100px] animate-pulse"></div>
                      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[80px] bottom-[-50px] right-[-50px] animate-pulse delay-700"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-white/5 rotate-45"></div>
                    </>
                  )}

                  {/* Play/Pause State Icon */}
                  <div className="relative z-10 flex flex-col items-center pointer-events-none">
                    {!isPlaying && !showToolbox && (
                      <div className="bg-white/10 backdrop-blur px-8 py-3 rounded-full border border-white/20 animate-in fade-in">
                        <span className="text-white font-bold tracking-widest flex items-center gap-2"><Play size={20} fill="white"/> PAUSED</span>
                      </div>
                    )}
                  </div>
               </div>

               {/* --- B. THE TOOLBOX (Popup Overlay) --- */}
               {showToolbox && (
                 <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-500">
                   <div className="bg-white w-full max-w-lg p-8 rounded-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-300">
                     
                     {/* Decorative Header */}
                     <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                     
                     <div className="text-center mb-6">
                       <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                         <Sparkles size={24} />
                       </div>
                       <h2 className="text-2xl font-bold text-slate-900">Reflection Point</h2>
                       <p className="text-slate-500 text-sm">Take a moment to process what you just watched.</p>
                     </div>

                     {/* QUESTION 1: Learning Input */}
                     <div className="mb-6">
                       <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                         What is your key takeaway so far?
                       </label>
                       <textarea 
                         className="w-full h-24 p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none transition-all"
                         placeholder="I learned that..."
                         autoFocus
                       ></textarea>
                     </div>

                     {/* QUESTION 2: Feeling Selector */}
                     <div className="mb-8">
                       <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                         How are you feeling about this topic?
                       </label>
                       <div className="flex justify-center gap-4">
                         <button 
                           onClick={() => setFeeling('confused')}
                           className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all w-24 ${feeling === 'confused' ? 'bg-red-50 border-red-200 text-red-600 scale-105' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                         >
                           <Meh size={28} />
                           <span className="text-xs font-bold">Unsure</span>
                         </button>
                         <button 
                            onClick={() => setFeeling('neutral')}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all w-24 ${feeling === 'neutral' ? 'bg-amber-50 border-amber-200 text-amber-600 scale-105' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                         >
                           <Smile size={28} />
                           <span className="text-xs font-bold">Okay</span>
                         </button>
                         <button 
                            onClick={() => setFeeling('happy')}
                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all w-24 ${feeling === 'happy' ? 'bg-emerald-50 border-emerald-200 text-emerald-600 scale-105' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
                         >
                           <Zap size={28} />
                           <span className="text-xs font-bold">Excited</span>
                         </button>
                       </div>
                     </div>

                     {/* Submit Button */}
                     <button 
                       onClick={handleResume}
                       className="w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                     >
                       Save to Notes & Continue <ArrowRight size={16} />
                     </button>

                   </div>
                 </div>
               )}

               {/* Video Controls (Bottom Bar) */}
               <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${showToolbox ? 'opacity-0' : 'opacity-100'}`}>
                 <div className="h-1 bg-white/30 rounded-full mb-4 cursor-pointer overflow-hidden">
                    <div className="h-full bg-indigo-500 relative transition-all duration-300 ease-linear" style={{ width: `${progress}%` }}></div>
                 </div>
                 <div className="flex justify-between items-center text-white">
                    <div className="flex items-center gap-4">
                       <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <Pause size={20}/> : <Play size={20}/>}</button>
                       <span className="text-sm font-medium">04:20 / 12:45</span>
                    </div>
                 </div>
               </div>
            </div>

            {/* VIDEO DETAILS */}
            <div className="mb-8">
               <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{module.title}</h1>
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                     <span className="flex items-center gap-1"><Zap size={16} className="text-amber-500" /> 1,204 Students</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 font-bold text-sm transition"><ThumbsUp size={18} /> Like</button>
                     <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 font-bold text-sm transition"><Share2 size={18} /> Share</button>
                  </div>
               </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[600px] sticky top-24">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 rounded-t-2xl">
                   <div className="flex items-center gap-2 font-bold text-slate-700">
                      <FileText size={18} className="text-indigo-600" />
                      <span>Smart Notes</span>
                   </div>
                </div>
                <div className="flex-1 p-4 bg-slate-50/30">
                   <textarea 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full h-full bg-transparent resize-none outline-none text-slate-600 text-sm leading-relaxed placeholder:text-slate-400 font-medium"
                      placeholder="Your reflection notes will appear here automatically after the check-in..."
                   ></textarea>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- 4. MAIN APP ---
export default function App() {
  const [current, setCurrent] = useState(null);
  return current ? <VideoPlayer module={current} onBack={() => setCurrent(null)} /> : <SnakeRoadmap onSelect={setCurrent} />;
}