import React from 'react';

const StepCard = ({ number, title, description, icon }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-gradient-to-r from-green-400 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
        {icon}
      </div>
      <div className="bg-white rounded-lg shadow-md p-6 w-full">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold -mt-16 mb-8 border-4 border-white">
        {number}
      </div>
    </div>
  );
};

export default StepCard;