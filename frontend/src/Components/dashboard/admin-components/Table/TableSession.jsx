import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../api/axios";

export default function TableSeance() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [seances, setSeances] = useState([]);
  const [films, setFilms] = useState([]); 
  const [salles, setSalles] = useState([]);
  const [seanceData, setSeanceData] = useState({
    film: "",
    salle: "",
    date: "",
    price: "",
  });

  useEffect(() => {
    const fetchSeances = async () => {
      try {
        const response = await axiosInstance.get("/seances");
        setSeances(response.data);
      } catch (error) {
        console.error("Error fetching seances:", error);
      }
    };

    const fetchFilms = async () => {
      try {
        const response = await axiosInstance.get("/films");
        setFilms(response.data);
      } catch (error) {
        console.error("Error fetching films:", error);
      }
    };

    const fetchSalles = async () => {
      try {
        const response = await axiosInstance.get("/salles"); 
        
        setSalles(response.data.salles);
        console.log(response.data);
        
      } catch (error) {
        console.error("Error fetching salles:", error);
      }
    };

    fetchSeances();
    fetchFilms();
    fetchSalles();
  }, []);

  const handleModalOpen = (seance = {}) => {
    if (seance._id) {
      setIsEditing(true);
      setSeanceData({
        _id: seance._id, 
        film: seance.film?.title || "",
        salle: seance.salle?.name || "",
        date: seance.date || "",
        price: seance.price || "",
      });
    } else {
      setIsEditing(false);
      setSeanceData({
        film: "",
        salle: "",
        date: "",
        price: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSeanceData({
      film: "",
      salle: "",
      date: "",
      price: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axiosInstance.put(`/seances/${seanceData._id}`, seanceData);
        console.log(seanceData._id);
        
        console.log("Seance updated:", seanceData);
      } else {
        await axiosInstance.post("/seances", seanceData);
        console.log("Seance created:", seanceData);
      }
      const response = await axiosInstance.get("/seances");
      setSeances(response.data);
    } catch (error) {
      console.error("Error submitting seance:", error.response?.data || error);
    }

    closeModal();
  };

  const handleDelete = async (seanceId) => {
    try {
      await axiosInstance.delete(`/seances/${seanceId}`);
      console.log("Seance deleted:", seanceId);
      const response = await axiosInstance.get("/seances");
      setSeances(response.data);
    } catch (error) {
      console.error("Error deleting seance:", error);
    }
  };

  return (
    <div className="overflow-x-auto w-[80%] m-5">
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => handleModalOpen()}
        >
          Create Seance
        </button>
      </div>

      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left py-2 px-4 border-b">ID</th>
            <th className="text-left py-2 px-4 border-b">Film</th>
            <th className="text-left py-2 px-4 border-b">Salle</th>
            <th className="text-left py-2 px-4 border-b">Date</th>
            <th className="text-left py-2 px-4 border-b">Price</th>
            <th className="text-left py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {seances.map((seance) => (
            <tr className="hover:bg-gray-100" key={seance._id}>
              <td className="py-2 px-4 border-b">{seance._id}</td>
              <td className="py-2 px-4 border-b">{seance.film?.title || "Unknown"}</td>
              <td className="py-2 px-4 border-b">{seance.salle?.name || "Unknown"}</td>
              <td className="py-2 px-4 border-b">{new Date(seance.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">${seance.price}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleModalOpen(seance)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(seance._id)}
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
            <h2 className="text-2xl mb-4">{isEditing ? "Edit Seance" : "Create Seance"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Film</label>
                <select
                  value={seanceData.film}
                  onChange={(e) => setSeanceData({ ...seanceData, film: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a film</option>
                  {films.map((film) => (
                    <option key={film._id} value={film._id}>{film.title}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Salle</label>
                <select
                  value={seanceData.salle}
                  onChange={(e) => setSeanceData({ ...seanceData, salle: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a salle</option>
                  {salles.map((salle) => (
                    <option key={salle._id} value={salle._id}>{salle.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  value={seanceData.date}
                  onChange={(e) => setSeanceData({ ...seanceData, date: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  value={seanceData.price}
                  onChange={(e) => setSeanceData({ ...seanceData, price: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
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
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
