import React, { useState } from 'react';

const features = [
  { icon: '🍳', title: 'Recipe Finder', desc: 'Find wild new recipes with what you have at home.' },
  { icon: '🍔', title: 'Restaurant Finder', desc: 'Discover crazy places to eat near you.' },
  { icon: '🥦', title: 'Diet Planner', desc: 'Plan your healthy (or not!) journey.' },
  { icon: '🛒', title: 'Grocery List', desc: 'Never forget your groceries again.' },
];

const steps = [
  { icon: '1️⃣', title: 'Pick a Feature', desc: 'Choose what you want to do: find recipes, restaurants, plan a diet, or make a list.' },
  { icon: '2️⃣', title: 'Go Crazy', desc: 'Search, plan, and explore with our fun tools.' },
  { icon: '3️⃣', title: 'Enjoy!', desc: 'Eat, cook, and live your best foodie life.' },
];

const testimonials = [
  { quote: 'Tastehub made cooking fun again! 😋', name: 'Alex' },
  { quote: 'I found the best burger joint in town! 🍔', name: 'Sam' },
  { quote: 'My grocery trips are finally organized. 🛒', name: 'Jamie' },
];

const homeSuggestions = [
  'Pizza', 'Paneer', 'Pasta', 'Avocado', 'New York', 'Los Angeles', 'Italian', 'Indian', 'Burger', 'Salad', 'Tokyo', 'Sushi', 'Eggs', 'Spinach', 'London', 'Paris', 'Sandwich', 'Rice', 'Chicken', 'Tacos', 'Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Hyderabad', 'Cheese', 'Soup', 'Curry', 'Noodles', 'Bread', 'Carrots', 'Broccoli', 'Stir Fry', 'Toast', 'PB&J', 'Granola', 'Lime', 'Chili', 'Vegetarian', 'Vegan', 'Gluten Free', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert', 'Recipe Finder', 'Restaurant Finder', 'Diet Planner', 'Grocery List'
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filteredSuggestions =
    search.length > 0
      ? homeSuggestions.filter(s => s.toLowerCase().includes(search.toLowerCase())).slice(0, 7)
      : [];
  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      {/* Hero */}
      <section className="w-full max-w-3xl text-center mb-12">
        <h1 className="text-5xl font-extrabold text-black mb-4 flex items-center justify-center">😋 Tastehub</h1>
        <p className="mb-6 text-2xl text-blue-700 font-bold">Welcome to the craziest food app ever!</p>
        <p className="text-lg text-gray-700 mb-6">Explore recipes, find restaurants, plan your diet, and never forget your groceries. Use the navigation above to get started!</p>
        <div className="w-full max-w-md mx-auto relative mb-2">
          <input
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
            placeholder="Search for recipes, places, or features..."
            className="w-full px-4 py-3 border-2 border-blue-400 rounded-lg text-lg focus:outline-none"
          />
          {showSuggestions && filteredSuggestions.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border-2 border-blue-200 rounded-b-lg shadow z-10 max-h-56 overflow-y-auto">
              {filteredSuggestions.map(s => (
                <li
                  key={s}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-left"
                  onMouseDown={() => handleSuggestionClick(s)}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="w-full max-w-5xl mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(f => (
            <div key={f.title} className="bg-gray-100 border-2 border-black rounded-xl p-6 flex flex-col items-center">
              <span className="text-4xl mb-2">{f.icon}</span>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-700 text-center">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full max-w-4xl mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map(s => (
            <div key={s.title} className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 flex flex-col items-center">
              <span className="text-3xl mb-2">{s.icon}</span>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-gray-700 text-center">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-4xl mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(t => (
            <div key={t.name} className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 flex flex-col items-center">
              <p className="text-lg italic mb-2">"{t.quote}"</p>
              <span className="font-bold text-yellow-700">- {t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-2xl text-center mb-8">
        <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
        <p className="mb-6 text-lg text-gray-700">Jump into any feature using the menu above and start your crazy food adventure!</p>
        <a href="/recipe-finder" className="inline-block bg-blue-700 text-white font-bold px-8 py-3 rounded-lg text-lg hover:bg-blue-800 transition">Try Recipe Finder</a>
      </section>
    </div>
  );
}