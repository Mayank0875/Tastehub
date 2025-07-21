// Z-Algorithm to check if pattern exists in text
function zAlgorithmSearch(text, pattern) {
  const concat = pattern + "$" + text;
  const Z = Array(concat.length).fill(0);
  let l = 0, r = 0;

  for (let i = 1; i < concat.length; i++) {
    if (i <= r) {
      Z[i] = Math.min(r - i + 1, Z[i - l]);
    }
    while (
      i + Z[i] < concat.length &&
      concat[Z[i]] === concat[i + Z[i]]
    ) {
      Z[i]++;
    }
    if (i + Z[i] - 1 > r) {
      l = i;
      r = i + Z[i] - 1;
    }
  }

  return Z.some(z => z === pattern.length);
}


export function searchDishesUsingZAlgo(dishes, query) {
  const lowerQuery = query.toLowerCase();
  return dishes.filter(dish =>
    zAlgorithmSearch(dish.name.toLowerCase(), lowerQuery)
  );
}



function buildLPS(pattern) {
  const lps = Array(pattern.length).fill(0);
  let len = 0;
  for (let i = 1; i < pattern.length;) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i] = 0;
      i++;
    }
  }
  return lps;
}


function kmpSearch(text, pattern) {
  const lps = buildLPS(pattern);
  let i = 0, j = 0;

  while (i < text.length) {
    if (pattern[j] === text[i]) {
      i++;
      j++;
      if (j === pattern.length) return true;
    } else if (j !== 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }

  return false;
}


export function searchDishesUsingKMP(dishes, query) {
  const lowerQuery = query.toLowerCase();
  return dishes.filter(dish =>
    kmpSearch(dish.name.toLowerCase(), lowerQuery)
  );
}


import React, { useState } from 'react';
import { searchDishesUsingZAlgo, searchDishesUsingKMP } from './searchUtils';

const dishes = [
  { name: "Margherita Pizza" },
  { name: "Spaghetti Carbonara" },
  { name: "Cheeseburger" },
  { name: "Grilled Chicken Salad" },
  { name: "Beef Tacos" },
  { name: "Pasta Alfredo" },
];

function DishSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const matched = searchDishesUsingKMP(dishes, query);
    setResults(matched);
  };

  return (
    <div>
      <h2>Search Dishes</h2>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search dish..." />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((dish, idx) => (
          <li key={idx}>{dish.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default DishSearch;
