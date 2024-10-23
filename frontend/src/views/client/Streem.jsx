import React, { useEffect, useState } from "react";
import NavBarSt from "../../Components/streeming/streemComponents/NavBarSt";
import CardFilm from "../../Components/streeming/streemComponents/CardFilm";
import axiosInstance from "../../api/axios";
import Footer from "../../Components/footer/Footer";

export default function Streem() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axiosInstance.get("/films");
        setFilms(response.data);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };
    fetchFilms();
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen bg-black">
        <NavBarSt />

        <main className="flex-grow p-6">
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {films.map((film) => (
              <CardFilm key={film._id} id={film._id} title={film.title} />
            ))}
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
