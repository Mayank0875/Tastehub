// components/Router.jsx
import React, { useState, useEffect } from 'react';

const RouterContext = React.createContext();

export const Router = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const handlePopState = () => {
      console.log('Browser back/forward button used');
      setCurrentPath(window.location.pathname);
      setKey(prev => prev + 1); // Force remount
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    setKey(prev => prev + 1); // Force remount
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, key }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = React.useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a Router');
  }
  return context;
};

export const Route = ({ path, component: Component, exact = false }) => {
  const { currentPath, key } = useRouter();
  
  const isMatch = exact 
    ? currentPath === path
    : currentPath.startsWith(path);

  return isMatch ? <Component key={key} /> : null;
};

export const Link = ({ to, children, className = "" }) => {
  const { navigate } = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};