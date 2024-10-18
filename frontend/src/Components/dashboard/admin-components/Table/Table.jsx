import React, { useState } from 'react';

export default function Table() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    visibility: '',
  });

  const handleModalOpen = (user = {}) => {
    if (user.id) {
      setIsEditing(true);
      setUserData(user);
    } else {
      setIsEditing(false);
      setUserData({
        id: '',
        name: '',
        email: '',
        password: '',
        visibility: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      console.log('Editing user:', userData);
    } else {
      console.log('Creating user:', userData);
    }
    closeModal();
  };

  return (
    <div className="overflow-x-auto w-[80%] m-5">
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => handleModalOpen()}
        >
          Create User
        </button>
      </div>

      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left py-2 px-4 border-b">ID</th>
            <th className="text-left py-2 px-4 border-b">Name</th>
            <th className="text-left py-2 px-4 border-b">Email</th>
            <th className="text-left py-2 px-4 border-b">Visibility</th>
            <th className="text-left py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="py-2 px-4 border-b">12</td>
            <td className="py-2 px-4 border-b">Alae</td>
            <td className="py-2 px-4 border-b">alae@gmail.com</td>
            <td className="py-2 px-4 border-b">Public</td>
            <td className="py-2 px-4 border-b flex space-x-2">
              <button
                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => handleModalOpen({ id: 12, name: 'Alae', email: 'alae@gmail.com', visibility: 'Public' })}
              >
                Edit
              </button>
              <button className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl mb-4">{isEditing ? 'Edit User' : 'Create User'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              {!isEditing && (
                <div className="mb-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                    required={!isEditing}
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700">Visibility</label>
                <input
                  type="text"
                  value={userData.visibility}
                  onChange={(e) => setUserData({ ...userData, visibility: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {isEditing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
