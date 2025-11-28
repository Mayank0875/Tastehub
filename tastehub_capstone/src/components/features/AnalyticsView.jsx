import { AlertTriangle, Lock } from 'lucide-react';

const AnalyticsView = ({ score, rentSecured }) => {
  return (
    <div className="animate-fade-in p-2">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Apna Hisaab (Analytics)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Paisa Kahan Gaya?</h4>
          <div className="flex items-center gap-8 justify-center mb-8">
            <div className="relative w-40 h-40">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eee" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#f97316" strokeWidth="3" strokeDasharray="60, 100" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="40, 100" strokeDashoffset="-60" />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-2xl font-bold text-slate-800">Total</span><br/>
                <span className="text-xs text-slate-500">₹15k</span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-bold text-slate-700">Zaroori (Needs)</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-bold text-slate-700">Faltu (Wants)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Vasooli Report Card</h4>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 text-red-600 p-2 rounded-lg">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Vasooli Score</p>
                  <p className="text-xs text-slate-500">Lower is better</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                  {score} (High)
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                  <Lock size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Rent Jugad</p>
                  <p className="text-xs text-slate-500">Secured in Vault</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-slate-900">{rentSecured}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;

