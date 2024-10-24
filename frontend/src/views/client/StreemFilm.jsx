import React, { useState } from "react";
import NavBarSt from "../../Components/streeming/streemComponents/NavBarSt";
import Footer from "../../Components/footer/Footer";
import image from "../../assets/hero-image.jpg"; // Replace with your image path
import video from "../../../../backend/uploads/video.mp4"; // Local video file

export default function StreemFilm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  
  // Simulate user data
  const currentUser = {
    name: "John Doe", 
    image: "https://randomuser.me/api/portraits/men/1.jpg" // Replace with actual image URL
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      const newComment = {
        text: comment,
        user: currentUser,
      };
      setComments([...comments, newComment]);
      setComment(""); // Clear the input after submission
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-black">
        <NavBarSt />
        <main className="flex-grow p-6">
          <div className="container mx-auto py-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Film Poster */}
              <div className="w-full md:w-1/3">
                <img
                  src={image}
                  alt="Film Poster"
                  className="w-full md:h-full rounded-lg shadow-lg"
                />
              </div>

              {/* Film Details */}
              <div className="w-full md:w-2/3 text-white">
                <h1 className="text-4xl font-bold mb-4">Vikings</h1>
                <p className="text-gray-400 text-lg mb-4">
                  A short test description.
                </p>

                <div className="flex items-center mb-4">
                  <span className="bg-yellow-200 text-black px-3 py-1 rounded-full text-sm font-bold">
                    ⭐ 4.5
                  </span>
                  <span className="ml-4 text-gray-400">IMDB Rating</span>
                </div>

                <h2 className="text-2xl font-semibold mb-2">Description</h2>
                <p className="text-gray-300 mb-6">
                  Vikings is a historical drama television series created by
                  Michael Hirst.
                </p>
              </div>
            </div>

            {/* Video Section */}
            <section className="mt-10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Watch Trailer
              </h2>
              <div className="relative w-full pb-[36.25%]">
                <video
                  className="absolute top-0 left-56 w-4/6 h-6/6 rounded-lg shadow-lg"
                  src={video}
                  controls
                />
              </div>
            </section>

            {/* Rating Section */}
            <section className="mt-10 text-white">
              <h2 className="text-3xl font-bold mb-4">Rate This Film</h2>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`cursor-pointer text-3xl ${
                      star <= (hoverRating || rating)
                        ? "text-yellow-500"
                        : "text-gray-500"
                    }`}
                  >
                    {/* Star SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.192 6.736h7.065c.969 0 1.371 1.24.588 1.81l-5.723 4.115 2.192 6.735c.3.921-.755 1.688-1.538 1.118l-5.724-4.114-5.724 4.114c-.783.57-1.838-.197-1.538-1.118l2.192-6.735-5.723-4.115c-.783-.57-.38-1.81.588-1.81h7.065l2.192-6.736z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                ))}
              </div>
              <p className="mt-2 text-gray-300">Your Rating: {rating}</p>
            </section>

            {/* Comment Section */}
            <section className="mt-10 text-white">
              <h2 className="text-3xl font-bold mb-4">Comments</h2>
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                  className="w-full p-4 rounded-md bg-gray-800 text-white"
                  rows="4"
                  placeholder="Write your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 bg-yellow-500 px-4 py-2 rounded-md text-black"
                >
                  Submit Comment
                </button>
              </form>

              <div className="space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 p-4 rounded-lg shadow-md flex"
                    >
                      {/* User Image */}
                      <img
                        src={comment.user.image}
                        alt={comment.user.name}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        {/* Username */}
                        <p className="text-yellow-500 font-bold">
                          {comment.user.name}
                        </p>
                        {/* Comment Text */}
                        <p className="text-white">{comment.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No comments yet.</p>
                )}
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
