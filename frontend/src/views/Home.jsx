import React, { useState, useEffect } from "react";
import Header from "../Components/header/Header";
import Card from "../Components/card/card";
import Filter from "../Components/filter/Filter";
import SeanceCarousel from "../Components/seanceCarousel/SeanceCarousel";
import axios from "axios";
import axiosInstance from "../api/axios";

const Home = () => {
  const [films, setFilms] = useState([]);
  const [seances, setSeances] = useState([]);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axiosInstance.get("films/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data);

        setFilms(response.data);
      } catch (error) {
        console.error("Error fetching films:", error);
        setError("Failed to fetch films.");
      }
    };

    fetchFilms();
  }, []);

  const handleFilterChange = (genre) => {
    setSelectedGenre(genre);
  };
  const filteredFilms = selectedGenre
    ? films.filter((film) => film.genre === selectedGenre)
    : films;

  // console.log(filteredFilms);
  return (
    <div className="bg-black">
      <Header />
      <main className="p-5">
        <div>
          <Filter genres={genres} onFilterChange={handleFilterChange} />
        </div>

        <section className="p-5">
          <h2 className="text-white text-2xl font-bold mb-4">Films</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFilms.map(
              (film) => (
                console.log(`${import.meta.env.VITE_MINIO_URL}${film.image}`),
                (
                  <Card
                    key={film._id}
                    imgSrc={`${import.meta.env.VITE_MINIO_URL}${film.image}`}
                    title={film.title}
                    genre={film.genre}
                    id={film._id}
                  />
                )
              )
            )}
          </div>
        </section>

        {/* Seances Section */}
      </main>
    </div>
  );
};

export default Home;
