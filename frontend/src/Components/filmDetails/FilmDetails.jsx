import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../header/Header'; // Assuming you have a Header component
import imgFilm from '../../assets/hero-image.jpg'; // Example image placeholder

export default function FilmDetails() {
  const { id } = useParams(); // Get film ID from the URL params

  // Example film data (replace with real data or fetch from API)
  const film = {
    title: 'Inception',
    year: 2010,
    synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    rating: 8.8,
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page', 'Tom Hardy'],
    poster: imgFilm, // Placeholder image for the film
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Header />

      <div className="container mx-auto py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Side: Film Poster */}
          <div className="w-full md:w-1/3">
            <img
              src={film.poster}
              alt={film.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Right Side: Film Information */}
          <div className="w-full md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{film.title}</h1>
            <p className="text-gray-400 text-lg mb-4">{film.year}</p>

            <div className="flex items-center mb-4">
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ {film.rating}
              </span>
              <span className="ml-4 text-gray-400">IMDB Rating</span>
            </div>

            <h2 className="text-2xl font-semibold mb-2">Synopsis</h2>
            <p className="text-gray-300 mb-6">{film.synopsis}</p>

            <h2 className="text-2xl font-semibold mb-2">Cast</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {film.cast.map((actor, index) => (
                <li key={index}>{actor}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
