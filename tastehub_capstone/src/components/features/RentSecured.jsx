const RentSecured = ({ rentSecured, rentDue }) => {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Rent Ka Jugad</h4>
        <span className="text-xs font-bold text-orange-600">Due {rentDue}</span>
      </div>
      <div className="flex items-end gap-2 mb-4">
        <span className="text-4xl font-bold text-slate-900">{rentSecured}%</span>
        <span className="text-sm text-slate-400 font-bold mb-1.5">Secured</span>
      </div>
      <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
        <div className="bg-orange-500 h-full rounded-full" style={{ width: `${rentSecured}%` }}></div>
      </div>
    </div>
  );
};

export default RentSecured;

