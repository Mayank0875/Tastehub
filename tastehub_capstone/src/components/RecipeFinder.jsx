import React, { useState } from 'react';

const sampleRecipes = [
  { name: 'Spicy Avocado Toast', desc: 'Avocado, chili flakes, and a squeeze of lime on toast.', emoji: '🥑' },
  { name: 'Crazy Veggie Stir Fry', desc: 'Broccoli, bell peppers, and carrots in a zesty sauce.', emoji: '🥦' },
  { name: 'Ultimate PB&J', desc: 'Peanut butter, jelly, and a sprinkle of granola.', emoji: '🥜' },
];

const tips = [
  'Try searching for an ingredient you have at home!',
  'Mix and match recipes for a wild meal.',
  'Don’t be afraid to experiment!'
];

const suggestionsList = [
  'Pizza', 'Paneer', 'Pasta', 'Avocado', 'New York', 'Los Angeles', 'Italian', 'Indian', 'Burger', 'Salad', 'Tokyo', 'Sushi', 'Eggs', 'Spinach', 'London', 'Paris', 'Sandwich', 'Rice', 'Chicken', 'Tacos', 'Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Hyderabad', 'Cheese', 'Soup', 'Curry', 'Noodles', 'Bread', 'Carrots', 'Broccoli', 'Stir Fry', 'Toast', 'PB&J', 'Granola', 'Lime', 'Chili', 'Vegetarian', 'Vegan', 'Gluten Free', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'
];

export default function RecipeFinder() {
  const [search, setSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions =
    search.length > 0
      ? suggestionsList.filter(s => s.toLowerCase().includes(search.toLowerCase())).slice(0, 7)
      : [];

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      {/* Hero */}
      <section className="w-full max-w-2xl text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2 flex items-center justify-center">🍳 Recipe Finder</h1>
        <p className="mb-4 text-lg text-gray-700">Find wild new recipes with what you have at home!</p>
      </section>

      {/* Search Bar with Autocomplete */}
      <section className="w-full max-w-md mb-10 relative">
        <input
          type="text"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          placeholder="Type a recipe, ingredient, or location..."
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
      </section>

      {/* Featured Recipes */}
      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">Featured Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleRecipes.map(r => (
            <div key={r.name} className="bg-gray-100 border-2 border-blue-200 rounded-xl p-6 flex flex-col items-center">
              <span className="text-3xl mb-2">{r.emoji}</span>
              <h3 className="text-lg font-bold mb-1">{r.name}</h3>
              <p className="text-gray-700 text-center">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Tips for Recipe Success</h2>
        <ul className="list-disc list-inside text-gray-700">
          {tips.map(t => <li key={t}>{t}</li>)}
        </ul>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-xl text-center">
        <h2 className="text-xl font-bold mb-2">Ready to cook up something crazy?</h2>
        <a href="/grocery-list" className="inline-block bg-blue-700 text-white font-bold px-6 py-2 rounded-lg text-lg hover:bg-blue-800 transition">Make a Grocery List</a>
      </section>
    </div>
  );
} 