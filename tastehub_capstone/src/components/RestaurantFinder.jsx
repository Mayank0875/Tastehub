import React, { useState } from 'react';

const sampleRestaurants = [
  { name: 'Burger Bonanza', desc: 'Home of the wildest burgers in town.', emoji: '🍔' },
  { name: 'Veggie Vibes', desc: 'Crazy good vegetarian eats.', emoji: '🥗' },
  { name: 'Pizza Planet', desc: 'Out-of-this-world pizza pies.', emoji: '🍕' },
];

const tips = [
  'Try searching for a cuisine or city!',
  'Check reviews for the craziest dishes.',
  'Support local restaurants!'
];

const suggestionsList = [
  'Pizza', 'Burger', 'Sushi', 'Pasta', 'Paneer', 'Veggie', 'Italian', 'Indian', 'Chinese', 'Japanese', 'Mexican', 'Thai', 'New York', 'Los Angeles', 'London', 'Paris', 'Tokyo', 'Bangalore', 'Delhi', 'Mumbai', 'Chennai', 'Hyderabad', 'Sandwich', 'Salad', 'Steakhouse', 'BBQ', 'Seafood', 'Diner', 'Cafe', 'Bakery', 'Bar', 'Fast Food', 'Fine Dining', 'Family Restaurant', 'Buffet', 'Vegan', 'Vegetarian', 'Gluten Free', 'Breakfast', 'Lunch', 'Dinner', 'Snack', 'Dessert'
];

export default function RestaurantFinder() {
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
        <h1 className="text-4xl font-extrabold text-orange-700 mb-2 flex items-center justify-center">🍔 Restaurant Finder</h1>
        <p className="mb-4 text-lg text-gray-700">Discover wild places to eat near you!</p>
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
          placeholder="Type a cuisine, restaurant, or location..."
          className="w-full px-4 py-3 border-2 border-orange-400 rounded-lg text-lg focus:outline-none"
        />
        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute left-0 right-0 bg-white border-2 border-orange-200 rounded-b-lg shadow z-10 max-h-56 overflow-y-auto">
            {filteredSuggestions.map(s => (
              <li
                key={s}
                className="px-4 py-2 cursor-pointer hover:bg-orange-100 text-left"
                onMouseDown={() => handleSuggestionClick(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Featured Restaurants */}
      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-bold mb-6 text-orange-700">Featured Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleRestaurants.map(r => (
            <div key={r.name} className="bg-gray-100 border-2 border-orange-200 rounded-xl p-6 flex flex-col items-center">
              <span className="text-3xl mb-2">{r.emoji}</span>
              <h3 className="text-lg font-bold mb-1">{r.name}</h3>
              <p className="text-gray-700 text-center">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-xl font-bold mb-4 text-orange-700">Map</h2>
        <div className="bg-gray-200 border-2 border-dashed border-orange-300 rounded-xl p-12 text-center text-gray-500">
          (Map will show up here!)
        </div>
      </section>

      {/* Tips */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-xl font-bold mb-4 text-orange-700">Tips for Foodies</h2>
        <ul className="list-disc list-inside text-gray-700">
          {tips.map(t => <li key={t}>{t}</li>)}
        </ul>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-xl text-center">
        <h2 className="text-xl font-bold mb-2">Found a place to eat?</h2>
        <a href="/diet-planner" className="inline-block bg-orange-700 text-white font-bold px-6 py-2 rounded-lg text-lg hover:bg-orange-800 transition">Plan Your Diet</a>
      </section>
    </div>
  );
} 