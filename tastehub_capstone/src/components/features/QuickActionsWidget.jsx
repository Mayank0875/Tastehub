import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Zap, TrendingUp } from 'lucide-react';

export default function QuickActionsWidget({ userId, vasooliScore, onOpenSuggestions }) {
  const [actions, setActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuickActions();
  }, [userId, vasooliScore]);

  const fetchQuickActions = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/suggestions/${userId}/quick-actions`);
      if (response.ok) {
        const data = await response.json();
        setActions(data.actions || []);
      }
    } catch (error) {
      console.error('Failed to fetch quick actions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'caution':
        return <TrendingUp className="w-5 h-5 text-orange-500" />;
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return <Zap className="w-5 h-5 text-gray-500" />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-50 border-red-200 hover:bg-red-100';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100';
      case 'caution':
        return 'bg-orange-50 border-orange-200 hover:bg-orange-100';
      case 'good':
        return 'bg-green-50 border-green-200 hover:bg-green-100';
      default:
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border-2 border-slate-200 p-6">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
          <div className="h-20 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border-2 border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900">⚡ Quick Actions</h3>
        <button
          onClick={onOpenSuggestions}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View All →
        </button>
      </div>

      <div className="space-y-3">
        {actions.length === 0 ? (
          <div className="text-center py-4 text-slate-600 text-sm">
            Sab theek hai! Keep it up! 👍
          </div>
        ) : (
          actions.slice(0, 2).map((action, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getColor(action.type)} transition-all cursor-pointer`}
              onClick={onOpenSuggestions}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{action.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm mb-1">
                    {action.title}
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {action.message}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {actions.length > 2 && (
        <button
          onClick={onOpenSuggestions}
          className="w-full mt-3 py-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
        >
          +{actions.length - 2} more suggestions
        </button>
      )}
    </div>
  );
}
