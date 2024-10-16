import React from "react";
import Navbar from "../navBar/Navbar";
import "./header.css";

export default function Header() {
  return (
    <>
      <header className="hero-img relative w-full h-screen bg-cover bg-center">
        <div className="bg-black bg-opacity-50 w-full h-full flex flex-col">
          <Navbar />
          <div className=" m-11 flex-grow flex justify-end flex-col text-white">
            <h1 className="text-5xl font-bold">Vikings</h1>
            <p className="mt-4 text-lg max-w-2xl">
              Scandinavia at the end of the 8th century. Ragnar Lodbrok, a young
              Viking warrior, is eager for adventures and new conquests
              <span className="text-lg text-purple-500 cursor-pointer">
                {" "}
                See more.
              </span>
            </p>

            <div className=" m-5 font-bold flex gap-3">
              <div>
                <button className="bg-purple-500 mt-2 py-1 px-5 rounded-sm hover:bg-purple-800">Book Now</button>
              </div>
              <div>
                <h2>January 20,2024</h2>
                <span>50 MAD</span>
              </div>
            </div>
          </div>sm
        </div>
      </header>
    </>
  );
}
