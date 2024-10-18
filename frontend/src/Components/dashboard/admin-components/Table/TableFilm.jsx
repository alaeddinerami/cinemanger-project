import React, { useState } from 'react';

export default function TableFilm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left py-2 px-4 border-b">ID</th>
            <th className="text-left py-2 px-4 border-b">Titles</th>
            <th className="text-left py-2 px-4 border-b">Genres</th>
            <th className="text-left py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">12</td>
            <td className="py-2 px-4 border-b">Alae</td>
            <td className="py-2 px-4 border-b">Public</td>
            <td className="py-2 px-4 border-b flex space-x-2">
              <button
                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={()=>{handleEdit()}}
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex w-full items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl mb-4">Edit User</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value=''
                  onChange={(e) => setEditData()}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value=''
                  onChange={(e) => setEditData()}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
