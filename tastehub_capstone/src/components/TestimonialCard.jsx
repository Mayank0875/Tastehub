import React from 'react';

const TestimonialCard = ({ quote, name, image }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="text-2xl text-green-500 mb-4">"</div>
      <p className="text-gray-700 italic mb-4">{quote}</p>
      <div className="flex items-center mt-4">
        <img 
          src={image} 
          alt={name} 
          className="w-10 h-10 rounded-full mr-3 object-cover" 
        />
        <span className="font-medium text-gray-800">{name}</span>
      </div>
    </div>
  );
};

export default TestimonialCard;