import React from "react";

export default function Header() {
  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white text-black">
     
      <div className="fixed bg-blue-900 w-full flex items-center justify-between h-14 text-white px-4 z-10">
        <a href=""
           className="block h-9 ml-2 w-auto fill-current text-white" >
            Logo
        </a>
        <div className="flex items-center justify-center">
          <div className="relative group">
            <button
              id="dropdown-button"
              className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-blue-950 rounded-md shadow-sm"
            >
              <span className="mr-2 text-white">Admin</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2 -mr-1 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              id="dropdown-menu"
              className="absolute text-black px-7 right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1"
            >
             logout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
