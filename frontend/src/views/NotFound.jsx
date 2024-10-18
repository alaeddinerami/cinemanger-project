import React from "react";

const NotFound = () => {
  return (
    <div>
      <div className="text-center flex flex-col bg-purple-50  justify-center h-[100vh]">
        <h1 className="mb-4 text-6xl font-semibold text-purple-700">404</h1>
        <p className="mb-4 text-lg text-black-0">Oops! Looks like you're lost.</p>
        <div className="animate-bounce">
          <svg
            className="mx-auto h-16 w-16 text-purple-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            ></path>
          </svg>
        </div>
        <p className="mt-4 text-black-0">
          Let's get you back{" "}
          <a href="/" className="text-purple-500">
            home
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default NotFound;
