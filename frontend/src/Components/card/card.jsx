import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ imgSrc, title, genre, id }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/film/${id}`);  
  };

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer"
      onClick={handleCardClick}
    >
      <img 
        src={imgSrc} 
        alt={title} 
        className="w-full h-48 object-cover" 
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-gray-300">{genre}</p>
      </div>
    </div>
  );
};

export default Card;
