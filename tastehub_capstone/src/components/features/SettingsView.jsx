import { ToggleLeft, ToggleRight } from 'lucide-react';

const SettingsView = () => {
  return (
    <div className="animate-fade-in p-2">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Agent Configuration</h3>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100">
        <div className="p-6 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900">Vasooli Mode (Aggressive)</h4>
            <p className="text-sm text-slate-500">Enables fear appeals and strict locking.</p>
          </div>
          <div className="text-orange-600">
            <ToggleRight size={40} className="fill-current" />
          </div>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900">Voice Notifications</h4>
            <p className="text-sm text-slate-500">Agent will shout via speaker.</p>
          </div>
          <div className="text-slate-300">
            <ToggleLeft size={40} className="fill-current" />
          </div>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900">Force Savings (20%)</h4>
            <p className="text-sm text-slate-500">Automatically deduct from income.</p>
          </div>
          <div className="text-green-600">
            <ToggleRight size={40} className="fill-current" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;

