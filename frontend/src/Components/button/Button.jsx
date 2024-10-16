import React from 'react';

const Button = ({ type = "button", onClick, children, className }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-24 self-end bg-purple-600 text-white py-2 rounded-md hover:bg-purple-800 transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
