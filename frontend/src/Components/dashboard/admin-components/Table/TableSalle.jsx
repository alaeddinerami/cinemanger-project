import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../api/axios";

export default function TableSalle() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [salles, setSalles] = useState([]);
  const [salleData, setSalleData] = useState({
    id: "",
    name: "",
    capacity: "",
  });

  useEffect(() => {
    const fetchSalles = async () => {
      try {
        const response = await axiosInstance.get("/salles");
        setSalles(response.data.salles);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching salles:", error);
      }
    };
    fetchSalles();
  }, []);

  const handleModalOpen = (salle = {}) => {
    if (salle._id) {
      setIsEditing(true);
      setSalleData({ ...salle });
    } else {
      setIsEditing(false);
      setSalleData({
        id: "",
        name: "",
        capacity: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSalleData({
      id: "",
      name: "",
      capacity: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axiosInstance.put(`/salles/${salleData._id}`, salleData);
        console.log("Salle updated:", salleData);
      } else {
        await axiosInstance.post("/salles", salleData);
        console.log("Salle created:", salleData);
      }
      const response = await axiosInstance.get("/salles");
      setSalles(response.data.salles);
    } catch (error) {
      console.error("Error submitting salle:", error.response?.data || error);
    }

    closeModal();
  };

  const handleDelete = async (salleId) => {
    try {
      await axiosInstance.delete(`/salles/${salleId}`);
      console.log("Salle deleted:", salleId);
      const response = await axiosInstance.get("/salles");
      setSalles(response.data.salles);
    } catch (error) {
      console.error("Error deleting salle:", error);
    }
  };

  return (
    <div className="overflow-x-auto w-[80%] m-5">
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => handleModalOpen()}
        >
          Create Salle
        </button>
      </div>

      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left py-2 px-4 border-b">ID</th>
            <th className="text-left py-2 px-4 border-b">Name</th>
            <th className="text-left py-2 px-4 border-b">Seats</th>
            <th className="text-left py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {salles.map((salle) => (
            <tr className="hover:bg-gray-100" key={salle._id}>
              <td className="py-2 px-4 border-b">{salle._id}</td>
              <td className="py-2 px-4 border-b">{salle.name}</td>
              <td className="py-2 px-4 border-b">{salle.capacity} seats</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleModalOpen(salle)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(salle._id)}
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
              {isEditing ? "Edit Salle" : "Create Salle"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={salleData.name}
                  onChange={(e) =>
                    setSalleData({ ...salleData, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Seats</label>
                <input
                  type="number"
                  value={salleData.capacity}
                  onChange={(e) =>
                    setSalleData({ ...salleData, capacity: e.target.value })
                  }
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
                  {isEditing ? "Update Salle" : "Create Salle"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
