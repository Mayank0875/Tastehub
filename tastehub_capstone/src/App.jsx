import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import RecipeFinder from './components/RecipeFinder';
import RestaurantFinder from './components/RestaurantFinder';
import DietPlanner from './components/DietPlanner';
import GroceryList from './components/GroceryList';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe-finder" element={<RecipeFinder />} />
          <Route path="/restaurant-finder" element={<RestaurantFinder />} />
          <Route path="/diet-planner" element={<DietPlanner />} />
          <Route path="/grocery-list" element={<GroceryList />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App