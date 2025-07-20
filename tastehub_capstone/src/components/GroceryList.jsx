import React, { useState } from 'react';

const sampleItems = [
  { name: 'Bananas', emoji: '🍌' },
  { name: 'Eggs', emoji: '🥚' },
  { name: 'Spinach', emoji: '🥬' },
  { name: 'Bread', emoji: '🍞' },
];

const tips = [
  'Check your pantry before shopping!',
  'Stick to your list for a crazy efficient trip.',
  'Don’t shop when you’re hungry!'
];

const grocerySuggestions = [
  'Bananas', 'Eggs', 'Spinach', 'Bread', 'Milk', 'Cheese', 'Chicken', 'Rice', 'Pasta', 'Tomatoes', 'Potatoes', 'Carrots', 'Onions', 'Apples', 'Oranges', 'Butter', 'Yogurt', 'Cereal', 'Oats', 'Beans', 'Lettuce', 'Cucumber', 'Peppers', 'Broccoli', 'Cauliflower', 'Garlic', 'Ginger', 'Lime', 'Lemon', 'Peanut Butter', 'Jam', 'Granola', 'Soup', 'Snacks', 'Juice', 'Coffee', 'Tea', 'Sugar', 'Salt', 'Pepper', 'Oil', 'Vinegar', 'Honey', 'Nuts', 'Seeds', 'Fish', 'Beef', 'Tofu', 'Mushrooms', 'Corn', 'Avocado', 'Berries', 'Grapes', 'Watermelon', 'Melon', 'Chili', 'Herbs', 'Spices', 'Ice Cream', 'Chocolate', 'Cookies', 'Crackers', 'Soda', 'Water'
];

export default function GroceryList() {
  const [item, setItem] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [groceryList, setGroceryList] = useState([]); // Dynamic grocery list

  const filteredSuggestions =
    item.length > 0
      ? grocerySuggestions.filter(s => s.toLowerCase().includes(item.toLowerCase())).slice(0, 7)
      : [];

  const handleSuggestionClick = (suggestion) => {
    setItem(suggestion);
    setShowSuggestions(false);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (item.trim() && !groceryList.some(i => i.toLowerCase() === item.trim().toLowerCase())) {
      setGroceryList([...groceryList, item.trim()]);
    }
    setItem('');
    setShowSuggestions(false);
  };

  const handleDeleteItem = (deleteItem) => {
    setGroceryList(groceryList.filter(i => i !== deleteItem));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      {/* Hero */}
      <section className="w-full max-w-2xl text-center mb-10">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-2 flex items-center justify-center">🛒 Grocery List</h1>
        <p className="mb-4 text-lg text-gray-700">Never forget your crazy groceries again!</p>
      </section>

      {/* Add Item Form with Autocomplete */}
      <section className="w-full max-w-md mb-10 flex gap-2">
        <form onSubmit={handleAddItem} className="flex w-full gap-2">
          <div className="relative w-full">
            <input
              type="text"
              value={item}
              onChange={e => {
                setItem(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
              placeholder="Add an item..."
              className="w-full px-4 py-3 border-2 border-purple-400 rounded-lg text-lg focus:outline-none"
            />
            {showSuggestions && filteredSuggestions.length > 0 && (
              <ul className="absolute left-0 right-0 bg-white border-2 border-purple-200 rounded-b-lg shadow z-10 max-h-56 overflow-y-auto">
                {filteredSuggestions.map(s => (
                  <li
                    key={s}
                    className="px-4 py-2 cursor-pointer hover:bg-purple-100 text-left"
                    onMouseDown={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit" className="bg-purple-600 text-white font-bold px-4 py-2 rounded-lg hover:bg-purple-700 transition">
            Add
          </button>
        </form>
      </section>

      {/* Dynamic Grocery List */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-2xl font-bold mb-6 text-purple-700">Your Grocery List</h2>
        {groceryList.length === 0 ? (
          <div className="bg-gray-100 border-2 border-purple-200 rounded-xl p-6 text-center text-gray-500">
            Your list is empty. Add some groceries!
          </div>
        ) : (
          <ul className="bg-gray-100 border-2 border-purple-200 rounded-xl p-6 flex flex-col gap-2">
            {groceryList.map(i => (
              <li key={i} className="flex items-center text-lg justify-between">
                <span>{i}</span>
                <button
                  onClick={() => handleDeleteItem(i)}
                  className="ml-4 text-purple-600 hover:text-purple-900 font-bold px-2 py-1 rounded"
                  aria-label={`Delete ${i}`}
                >
                  ✖️
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Shopping Tips */}
      <section className="w-full max-w-2xl mb-12">
        <h2 className="text-xl font-bold mb-4 text-purple-700">Shopping Tips</h2>
        <ul className="list-disc list-inside text-gray-700">
          {tips.map(t => <li key={t}>{t}</li>)}
        </ul>
      </section>

      {/* Call to Action */}
      <section className="w-full max-w-xl text-center">
        <h2 className="text-xl font-bold mb-2">Ready to cook?</h2>
        <a href="/recipe-finder" className="inline-block bg-purple-700 text-white font-bold px-6 py-2 rounded-lg text-lg hover:bg-purple-800 transition">Find a Recipe</a>
      </section>
    </div>
  );
} 