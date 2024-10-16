import React from 'react';
import img from '../../assets/hero-image.jpg';

const SeanceCard = ({ filmTitle, poster, salleId, time }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
      <img
        src={poster || img} // Use the poster prop or fallback to the default image
        alt={`${filmTitle} poster`}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 text-white">
        <h3 className="text-xl font-bold mb-2">{filmTitle}</h3>
        <p className="text-sm text-gray-400 mb-2">Salle: {salleId}</p> {/* Display the salle ID instead of a name */}
        <div className="text-right">
          <p className="text-lg font-semibold">{time}</p>
        </div>
      </div>
    </div>
  );
};

export default SeanceCard;
