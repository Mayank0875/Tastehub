import React from 'react';

const Button = ({ 
  text, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  className = '',
  icon = null 
}) => {
  const baseClasses = 'font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500',
    secondary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    outline: 'bg-transparent border border-green-500 text-green-500 hover:bg-green-50 focus:ring-green-500',
    white: 'bg-white hover:bg-gray-100 text-green-500 focus:ring-white'
  };
  
  const sizeClasses = {
    sm: 'py-1 px-4 text-sm',
    md: 'py-2 px-6 text-base',
    lg: 'py-3 px-8 text-lg'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      onClick={onClick}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClass}
        ${className}
      `}
    >
      <div className="flex items-center justify-center">
        {icon && <span className="mr-2">{icon}</span>}
        {text}
      </div>
    </button>
  );
};

export default Button;