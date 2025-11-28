import { ArrowRight } from 'lucide-react';
import Navbar from '../layout/Navbar';
import JudgeTip from '../ui/JudgeTip';
import { PROFILES } from '../../utils/constants';

const ProfileSelection = ({ onSelectProfile, onHome }) => {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center p-6 animate-fade-in relative">
      
      <Navbar onHome={onHome} showBackButton={true} />

      <div className="mt-20 text-center mb-10 max-w-2xl">
        <h2 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">Who is using GuardWallet?</h2>
        <p className="text-slate-500 font-medium mb-6">Select a persona to calibrate the Agent's aggression level.</p>
        <JudgeTip text="We recommend selecting 'Rahul Kumar' (High Risk). This demonstrates the most aggressive 'Vasooli' agent features tailored for the hackathon problem statement." />
      </div>

      <div className="flex flex-col md:flex-row gap-6 max-w-6xl w-full justify-center px-4">
        {PROFILES.map((profile) => (
          <button
            key={profile.id}
            onClick={() => onSelectProfile(profile)}
            className="group relative w-full md:w-80 h-[26rem] bg-white rounded-[2rem] p-8 text-left shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col"
          >
            <div className={`absolute top-0 left-0 w-full h-28 bg-gradient-to-br ${profile.theme} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-xl font-bold text-slate-800 mb-3 mt-4">
                {profile.initials}
              </div>
              <h3 className="text-xl font-bold text-slate-900 leading-tight mb-1">{profile.name}</h3>
              <p className="text-sm font-medium text-slate-500 mb-4">{profile.role}</p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-auto">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Demo Experience</p>
                 <p className="text-xs text-slate-600 font-medium leading-relaxed">{profile.demoTip}</p>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                  <span className="text-slate-400 font-medium text-xs uppercase">Risk Level</span>
                  <span className={`font-bold text-xs px-2 py-0.5 rounded-full ${
                     profile.risk === 'High' ? 'bg-red-100 text-red-600' : 
                     profile.risk === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {profile.risk}
                  </span>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                <ArrowRight size={18} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfileSelection;

