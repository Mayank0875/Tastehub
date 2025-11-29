import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Zap, TrendingUp, X } from 'lucide-react';

export default function SuggestionsPanel({ userId, vasooliScore, onClose }) {
  const [suggestions, setSuggestions] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuggestions();
  }, [userId]);

  const fetchSuggestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/suggestions/${userId}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
        setAnalysis(data.analysis);
      }
    } catch (error) {
      console.error('Failed to fetch suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'urgent':
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
      case 'caution':
        return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'good':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'invest':
      case 'tip':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      default:
        return <Zap className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'urgent':
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'warning':
      case 'caution':
        return 'bg-yellow-50 border-yellow-200';
      case 'good':
        return 'bg-green-50 border-green-200';
      case 'invest':
      case 'tip':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
          </div>
          <p className="text-center mt-4 text-slate-600">Vasooli Bhai analyze kar raha hai...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg max-w-3xl w-full my-8">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              💡 Vasooli Bhai ke Suggestions
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Tera Vasooli Score: <span className="font-bold text-red-600">{vasooliScore}</span>/100
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {/* Analysis Summary */}
        {analysis && (
          <div className="p-6 bg-slate-50 border-b border-slate-200">
            <h3 className="font-bold text-slate-900 mb-3">📊 Tera Spending Analysis</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600">Total Expense</p>
                <p className="text-lg font-bold text-red-600">₹{analysis.totalExpense}</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600">Total Income</p>
                <p className="text-lg font-bold text-green-600">₹{analysis.totalIncome}</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600">Savings Rate</p>
                <p className="text-lg font-bold text-blue-600">{analysis.savingsRate}%</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-600">Problems</p>
                <p className="text-lg font-bold text-orange-600">{analysis.problems.length}</p>
              </div>
            </div>

            {/* Spending Breakdown */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(analysis.spendingPercentage).map(([category, percentage]) => (
                percentage > 0 && (
                  <div key={category} className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 capitalize">{category}:</span>
                    <span className="font-semibold text-slate-900">{percentage}%</span>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Suggestions */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {suggestions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-600">Koi suggestion nahi hai abhi. Sab theek chal raha hai! ✅</p>
            </div>
          ) : (
            suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${getTypeColor(suggestion.type)} transition-all hover:shadow-md`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getTypeIcon(suggestion.type)}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 mb-2">
                      {suggestion.title}
                    </h4>
                    <p className="text-slate-700 text-sm leading-relaxed mb-3">
                      {suggestion.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="bg-white px-3 py-1.5 rounded-md border border-slate-200">
                        <p className="text-xs text-slate-600 font-medium">
                          ✅ {suggestion.action}
                        </p>
                      </div>
                      {suggestion.savings > 0 && (
                        <div className="bg-green-100 px-3 py-1.5 rounded-md">
                          <p className="text-xs text-green-700 font-bold">
                            💰 Save ₹{suggestion.savings}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-600">
              💪 Implement kar aur apna Vasooli Score kam kar!
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
            >
              Samajh gaya!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
