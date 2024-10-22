import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../api/axios";

export default function TableFilm() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [films, setFilms] = useState([]);
    const [filmData, setFilmData] = useState({
        id: "",
        title: "",
        genre: "",
        description: "",
        duration: "",
        image: null,
        video: null,
        visibility: "public",
        releaseDate: "",
    });

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

    const handleModalOpen = (film = {}) => {
        if (film._id) {
            setIsEditing(true);
            setFilmData({
                id: film._id,
                title: film.title,
                genre: film.genre,
                description: film.description,
                duration: film.duration,
                image: null, // Keep the previous image if editing
                video: null, // Keep the previous video if editing
                visibility: film.visibility || "public",
                releaseDate: film.releaseDate,
            });
        } else {
            setIsEditing(false);
            setFilmData({
                id: "",
                title: "",
                genre: "",
                description: "",
                duration: "",
                image: null,
                video: null,
                visibility: "public",
                releaseDate: "",
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFilmData({
            id: "",
            title: "",
            genre: "",
            description: "",
            duration: "",
            image: null,
            video: null,
            visibility: "public",
            releaseDate: "",
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (const key in filmData) {
            if ((key === "image" || key === "video") && filmData[key]) {
                formData.append(key, filmData[key]);
            } else if (key !== "image" && key !== "video") {
                formData.append(key, filmData[key]);
            }
        }

        try {
            if (isEditing) {
                await axiosInstance.put(`/films/${filmData.id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                console.log("Film updated:", filmData);
            } else {
                await axiosInstance.post("/films", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                console.log("Film created:", filmData);
            }
            // Fetch updated list of films
            const response = await axiosInstance.get("/films");
            setFilms(response.data);
        } catch (error) {
            console.error("Error submitting film:", error.response?.data || error);
        }

        closeModal();
    };

    const handleDelete = async (filmId) => {
        try {
            await axiosInstance.delete(`/films/${filmId}`);
            console.log("Film deleted:", filmId);
            const response = await axiosInstance.get("/films");
            setFilms(response.data);
        } catch (error) {
            console.error("Error deleting film:", error);
        }
    };

    const handleFileChange = (e, field) => {
        setFilmData({ ...filmData, [field]: e.target.files[0] });
    };

    return (
        <div className="overflow-x-auto w-[80%] m-5">
            <div className="flex justify-end mb-4">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={() => handleModalOpen()}
                >
                    Create Film
                </button>
            </div>

            <table className="min-w-full bg-white border-collapse border border-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="text-left py-2 px-4 border-b">ID</th>
                        <th className="text-left py-2 px-4 border-b">Title</th>
                        <th className="text-left py-2 px-4 border-b">Genre</th>
                        <th className="text-left py-2 px-4 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {films.map((film) => (
                        <tr className="hover:bg-gray-100" key={film._id}>
                            <td className="py-2 px-4 border-b">{film._id}</td>
                            <td className="py-2 px-4 border-b">{film.title}</td>
                            <td className="py-2 px-4 border-b">{film.genre}</td>
                            <td className="py-2 px-4 border-b flex space-x-2">
                                <button
                                    className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    onClick={() => handleModalOpen(film)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    onClick={() => handleDelete(film._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded md:w-[50vw] shadow-lg">
                        <h2 className="text-2xl mb-4">
                            {isEditing ? "Edit Film" : "Create Film"}
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="flex justify-around gap-8">
                                <div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Title</label>
                                        <input
                                            type="text"
                                            value={filmData.title}
                                            onChange={(e) =>
                                                setFilmData({ ...filmData, title: e.target.value })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Genre</label>
                                        <input
                                            type="text"
                                            value={filmData.genre}
                                            onChange={(e) =>
                                                setFilmData({ ...filmData, genre: e.target.value })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Description</label>
                                        <textarea
                                            value={filmData.description}
                                            onChange={(e) =>
                                                setFilmData({
                                                    ...filmData,
                                                    description: e.target.value,
                                                })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Duration (in minutes)</label>
                                        <input
                                            type="number"
                                            value={filmData.duration}
                                            onChange={(e) =>
                                                setFilmData({ ...filmData, duration: e.target.value })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Image</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, "image")}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Video</label>
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) => handleFileChange(e, "video")}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Visibility</label>
                                        <select
                                            value={filmData.visibility}
                                            onChange={(e) =>
                                                setFilmData({ ...filmData, visibility: e.target.value })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded"
                                        >
                                            <option value="public">Public</option>
                                            <option value="private">Private</option>
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700">Release Date</label>
                                        <input
                                            type="date"
                                            value={filmData.releaseDate}
                                            onChange={(e) =>
                                                setFilmData({ ...filmData, releaseDate: e.target.value })
                                            }
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    {isEditing ? "Update Film" : "Create Film"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
