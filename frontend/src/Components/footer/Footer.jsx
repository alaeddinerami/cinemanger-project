import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4 ">
      <div className="container mx-auto grid grid-cols-1 md:flex justify-center justify-around gap-8 px-8">
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <a href="/" className="hover:text-red-500 transition-colors">Home</a>
            </li>
           
            <li className="mb-2">
              <a href="/movies" className="hover:text-red-500 transition-colors">Movies</a>
            </li>
            
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <ul className="flex space-x-4">
            <li>
              <a href="https://facebook.com" className="hover:text-red-500 transition-colors" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.414c0-.966.182-1.586 1.582-1.586h2.418v-4h-3.75c-3.508 0-5.25 1.577-5.25 4.5v2.5z"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://twitter.com" className="hover:text-red-500 transition-colors" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.994 9.994 0 01-2.828.775 4.932 4.932 0 002.165-2.725c-.936.555-1.973.959-3.075 1.175a4.92 4.92 0 00-8.385 4.482 13.978 13.978 0 01-10.141-5.14 4.816 4.816 0 00-.664 2.475c0 1.708.869 3.216 2.19 4.099a4.897 4.897 0 01-2.228-.616v.061a4.93 4.93 0 003.946 4.827 4.936 4.936 0 01-2.224.085 4.932 4.932 0 004.604 3.416 9.874 9.874 0 01-6.102 2.103c-.396 0-.786-.023-1.175-.069a13.947 13.947 0 007.548 2.211c9.057 0 14.015-7.496 14.015-13.986 0-.213-.006-.426-.016-.637a10.025 10.025 0 002.459-2.547z"/>
                </svg>
              </a>
            </li>
            <li>
              <a href="https://instagram.com" className="hover:text-red-500 transition-colors" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.342 3.608 1.317.975.975 1.255 2.242 1.317 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.342 2.633-1.317 3.608-.975.975-2.242 1.255-3.608 1.317-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.342-3.608-1.317-.975-.975-1.255-2.242-1.317-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.342-2.633 1.317-3.608.975-.975 2.242-1.255 3.608-1.317 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.667.013-4.947.072-1.446.067-2.724.377-3.778 1.431s-1.364 2.332-1.431 3.778c-.059 1.28-.072 1.688-.072 4.947s.013 3.667.072 4.947c.067 1.446.377 2.724 1.431 3.778s2.332 1.364 3.778 1.431c1.28.059 1.688.072 4.947.072s3.667-.013 4.947-.072c1.446-.067 2.724-.377 3.778-1.431s1.364-2.332 1.431-3.778c.059-1.28.072-1.688.072-4.947s-.013-3.667-.072-4.947c-.067-1.446-.377-2.724-1.431-3.778s-2.332-1.364-3.778-1.431c-1.28-.059-1.688-.072-4.947-.072zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.846a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>
                </svg>
              </a>
            </li>
          </ul>
        </div>

        <div >
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="mb-2">Email: info@Cinemanager.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>
      </div>

      <div className="text-center mt-4">
        <p className="text-gray-500">&copy; 2024 Cinemanager. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
