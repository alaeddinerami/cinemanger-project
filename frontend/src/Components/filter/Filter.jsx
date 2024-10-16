import React from 'react';

const Filter = ({ genres, onFilterChange }) => {
  const handleChange = (event) => {
    onFilterChange(event.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-800 rounded-md">
      <div className="mb-2 sm:mb-0">
        <label htmlFor="genre" className="text-white mr-2">Filter by Genre:</label>
        <select
          id="genre"
          onChange={handleChange}
          className="bg-gray-700 text-white rounded-md p-2"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
