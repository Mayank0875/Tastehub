import React, { useState } from 'react';

const samplePlans = [
  { name: 'Quick Start', desc: 'Simple, balanced meals for busy people.', emoji: '⏱️' },
  { name: 'Muscle Builder', desc: 'High-protein, energy-packed plan.', emoji: '💪' },
  { name: 'Veggie Lover', desc: 'Plant-based meals for every day.', emoji: '🥕' },
];

const tips = [
  'Drink plenty of water!',
  'Balance your meals: protein, carbs, and veggies.',
  'Don’t skip breakfast!'
];

const goalSuggestions = [
  'Lose weight', 'Gain muscle', 'Maintain weight', 'Vegetarian', 'Vegan', 'Gluten Free', 'Low Carb', 'Keto', 'Paleo', 'Dairy Free', 'High Protein', 'Low Fat', 'Balanced', 'Heart Healthy', 'Diabetic Friendly', 'Low Sugar', 'Plant Based', 'Intermittent Fasting', 'Bulk Up', 'Cutting', 'Endurance', 'Energy Boost', 'Quick Meals', 'Meal Prep', 'Family Friendly', 'Budget Friendly', 'No Restrictions'
];

export default function DietPlanner() {
  const [goal, setGoal] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filteredSuggestions =
    goal.length > 0
      ? goalSuggestions.filter(s => s.toLowerCase().includes(goal.toLowerCase())).slice(0, 7)
      : [];
  const handleSuggestionClick = (suggestion) => {
    setGoal(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      {/* Hero */}
      <section className="w-full max-w-2xl text-center mb-10">
        <h1 className="text-4xl font-extrabold text-green-700 mb-2 flex items-center justify-center">🥦 Diet Planner</h1>
        <p className="mb-4 text-lg text-gray-700">Plan your crazy healthy journey!</p>
      </section>

      {/* Goal Form with Autocomplete */}
      <section className="w-full max-w-md mb-10">
        <form className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="text"
              value={goal}
              onChange={e => {
                setGoal(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              placeholder="Your goal (e.g., lose weight, gain muscle)"
              className="px-4 py-3 border-2 border-green-400 rounded-lg text-lg focus:outline-none w-full"
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border-2 border-green-200 rounded-b-lg shadow z-10 max-h-56 overflow-y-auto">
                {filteredSuggestions.map(s => (
                  <li
                    key={s}
                    className="px-4 py-2 cursor-pointer hover:bg-green-100 text-left"
                    onMouseDown={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input
            type="text"
            placeholder="Allergies or restrictions (optional)"
            className="px-4 py-3 border-2 border-green-400 rounded-lg text-lg focus:outline-none"
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition"
          >
            Get Plan
          </button>
        </form>
      </section>

      {/* Sample Diet Plans */}
      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Sample Diet Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {samplePlans.map(p => (
            <div key={p.name} className="bg-gray-100 border-2 border-green-200 rounded-xl p-6 flex flex-col items-center">
              <span className="text-3xl mb-2">{p.emoji}</span>
              <h3 className="text-lg font-bold mb-1">{p.name}</h3>
              <p className="text-gray-700 text-center">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Nutrition Tips */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-xl font-bold mb-4 text-green-700">Nutrition Tips</h2>
        <ul className="list-disc list-inside text-gray-700">
          {tips.map(t => <li key={t}>{t}</li>)}
        </ul>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-xl text-center">
        <h2 className="text-xl font-bold mb-2">Ready to shop for your plan?</h2>
        <a href="/grocery-list" className="inline-block bg-green-700 text-white font-bold px-6 py-2 rounded-lg text-lg hover:bg-green-800 transition">Go to Grocery List</a>
      </section>
    </div>
  );
} 