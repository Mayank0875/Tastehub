// contexts/AppContext.jsx
import React, { useState, useEffect } from 'react';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [problems, setProblems] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastFetch, setLastFetch] = useState(null);
  const [user] = useState({
    username: "one_unknown",
    rating: 1468,
    contribution: 0,
    avatar: "https://placehold.co/100x100/A0AEC0/000000?text=one_unknown"
  });

  const fetchProblems = async (force = false) => {
    // Don't refetch if we fetched less than 5 seconds ago (unless forced)
    if (!force && lastFetch && Date.now() - lastFetch < 5000) {
      console.log("Using cached problems");
      return;
    }

    console.log("Fetching all problems...");
    setLoading(true);
    try {
      const response = await fetch("https://tastehub-smhl.onrender.com/problem");
      const result = await response.json();
      if (result.success && result.data) {
        console.log(`Fetched ${result.data.length} problems`);
        setProblems(result.data);
        setLastFetch(Date.now());
      } else {
        console.error("API response was not successful:", result);
      }
    } catch (error) {
      console.error("Failed to fetch problems:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchProblems();
  }, []);

  const addSubmission = (submission) => {
    setSubmissions(prevSubmissions => {
      const existingSubmission = prevSubmissions.find(s => s.id === submission.id);
      if (existingSubmission) {
        return prevSubmissions.map(s => s.id === submission.id ? submission : s);
      }
      return [submission, ...prevSubmissions];
    });
  };

  const value = {
    problems,
    setProblems,
    submissions,
    addSubmission,
    loading,
    user,
    fetchProblems
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};