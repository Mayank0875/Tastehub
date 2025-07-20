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
  const [recipes, setRecipes] = useState([]); // For fetched recipes
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const filteredSuggestions =
    search.length > 0
      ? suggestionsList.filter(s => s.toLowerCase().includes(search.toLowerCase())).slice(0, 7)
      : [];

  const handleSuggestionClick = (suggestion) => {
    setSearch(suggestion);
    setShowSuggestions(false);
    fetchRecipes(suggestion);
  };

  const fetchRecipes = async (query) => {
    if (!query) return;
    setLoading(true);
    setError(null);
    setRecipes([]);
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setRecipes([]);
        setError('No recipes found.');
      }
    } catch (err) {
      setError('Failed to fetch recipes.');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      fetchRecipes(search);
      setShowSuggestions(false);
    }
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
          onKeyDown={handleKeyDown}
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

      {/* API Recipes or Featured Recipes */}
      <section className="w-full max-w-3xl mb-12">
        <h2 className="text-2xl font-bold mb-6 text-blue-700">{recipes.length > 0 ? 'Search Results' : 'Featured Recipes'}</h2>
        {loading && <div className="text-center text-blue-600">Loading recipes...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recipes.length > 0
            ? recipes.map(r => (
                <div key={r.idMeal} className="bg-gray-100 border-2 border-blue-200 rounded-xl p-6 flex flex-col items-center">
                  <img src={r.strMealThumb} alt={r.strMeal} className="w-24 h-24 object-cover rounded-full mb-2" />
                  <h3 className="text-lg font-bold mb-1">{r.strMeal}</h3>
                  <p className="text-gray-700 text-center line-clamp-3">{r.strInstructions?.slice(0, 100)}...</p>
                  <a href={r.strSource || r.strYoutube} target="_blank" rel="noopener noreferrer" className="mt-2 text-blue-600 underline text-sm">View Recipe</a>
                </div>
              ))
            : sampleRecipes.map(r => (
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