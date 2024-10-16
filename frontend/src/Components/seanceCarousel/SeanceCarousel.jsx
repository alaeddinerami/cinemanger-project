import React, { useState } from "react";
import SeanceCard from "../../Components/seance/SeanceCard"; // Import your SeanceCard component

const SeanceCarousel = ({ seances, films }) => { // Added films as a prop
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the previous seance
  const prevSeance = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? seances.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next seance
  const nextSeance = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === seances.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel Controls */}
      <button
        onClick={prevSeance}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 z-10"
      >
        &#8249;
      </button>
      <button
        onClick={nextSeance}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 z-10"
      >
        &#8250;
      </button>

      {/* Carousel Content */}
      <div
        className="flex transition-transform ease-in-out duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {seances.length > 0 ? (
          seances.map((seance) => (
            <div key={seance._id} className="w-full flex-shrink-0">
              <SeanceCard
                filmTitle={films.find(film => film._id === seance.film)?.title} // Get film title from films array
                poster={films.find(film => film._id === seance.film)?.image} // Get poster from films array
                salleId={seance.salle} // Assuming you want to display the salle ID
                time={new Date(seance.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} // Format the date to display time
              />
            </div>
          ))
        ) : (
          <div className="w-full flex-shrink-0 text-center text-white">
            <p>No seances available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeanceCarousel;
