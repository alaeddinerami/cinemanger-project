import React, { useEffect, useState } from "react";
import NavBarSt from "../../Components/streeming/streemComponents/NavBarSt";
import Footer from "../../Components/footer/Footer";
import axiosInstance from "../../api/axios";
import { useParams } from "react-router-dom";
import { getCurrentUser } from "../../api/auth";

export default function StreemFilm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const currentUser = getCurrentUser();

  const [avrRating, setavrRating]= useState("")
  // console.log(currentUser);
useEffect(()=>{
  const fetchAverRating = async()=>{
    try {
      const response = await axiosInstance.get(`/ratings/${id}`)
      setavrRating(response.data)
      console.log(response.data);
      
    } catch (error) {
      console.error("Error fetching film:", error);

    }
  }
  fetchAverRating();
},[id])
  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await axiosInstance.get(`/films/${id}`);
        setFilm(response.data);
      } catch (error) {
        console.error("Error fetching film:", error);
      }
    };
    fetchFilm();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching Comments:", error);
      }
    };
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;

    try {
      const response = await axiosInstance.post(
        `/comments/${id}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setComments((prevComments) => [...prevComments, response.data]);
      setComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axiosInstance.delete(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
      console.log("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-black">
        <NavBarSt />
        <main className="flex-grow p-6">
          <div className="container mx-auto py-8">
            {film ? (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3">
                  <img
                    src={`${import.meta.env.VITE_MINIO_URL}${film.image}`}
                    alt={film.title}
                    className="w-full md:h-full rounded-lg shadow-lg"
                  />
                </div>
                <div className="w-full md:w-2/3 text-white">
                  <h1 className="text-4xl font-bold mb-4">{film.title}</h1>
                  <p className="text-gray-400 text-lg mb-4">
                    {film.description}
                  </p>
                  <div className="flex items-center mb-4">
                    <span className="bg-yellow-200 text-black px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ {film.imdbRating || "N/A"}
                    </span>
                    <span className="ml-4 text-gray-400">IMDB Rating</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Loading film details...</p>
            )}

            <section className="mt-10">
              <h2 className="text-3xl font-bold text-white mb-4">Watch Film</h2>
              {film && film.video ? (
                <div className="relative w-full pb-[36.25%]">
                  <video
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                    src={`${import.meta.env.VITE_MINIO_URL}${film.video}`}
                    controls
                  />
                </div>
              ) : (
                <p className="text-gray-400">Film not available</p>
              )}
            </section>

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

            <section className="mt-10 text-white">
              <h2 className="text-3xl font-bold mb-4">Comments</h2>
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <textarea
                  className="w-full h-20 p-2 rounded-lg bg-gray-700 text-white"
                  placeholder="Write your comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  type="submit"
                  className="mt-2 bg-yellow-500 px-4 py-2 rounded-md text-black"
                >
                  Add Comment
                </button>
              </form>
              <div className="space-y-4">
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-gray-800 p-4 rounded-lg shadow-md flex justify-between"
                    >
                      <div className="flex">
                        <img
                          src={comment.user.image}
                          alt={comment.user.name}
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                          <p className="text-yellow-500 font-bold">
                            {comment.user.name}
                          </p>
                          <p className="text-white">{comment.comment}</p>
                        </div>
                      </div>

                      {comment.user._id === currentUser.id && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-6 h-6"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6l-1.5 14.5a2 2 0 0 1-2 1.5H8.5a2 2 0 0 1-2-1.5L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      )}
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
