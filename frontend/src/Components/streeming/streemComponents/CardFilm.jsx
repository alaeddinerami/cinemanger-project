import React from "react";
import { Link } from "react-router-dom";
import image from "../../../assets/hero-image.jpg"; // Replace with your image path

export default function CardFilm({ id, imgsrc, title }) {
  return (
    <div className="relative max-w-xs bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
      <div className="relative group">
        <Link to={`/film/${id}`}>
          <img
            src={imgsrc || image}
            alt={title}
            className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xl font-semibold transition-opacity duration-300">
            {title}
          </div>
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-2 bg-gray-900 bg-opacity-80 z-10">
        <div className="flex justify-between items-center text-white">
            {title}
          <button className="  text-white rounded-lg ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#FF0000"
              class="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
