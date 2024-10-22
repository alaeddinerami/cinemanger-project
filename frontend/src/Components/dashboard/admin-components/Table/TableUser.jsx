import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../api/axios";

export default function TableUser() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/admin/all");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleModalOpen = (user = {}) => {
    if (user.id) {
      setIsEditing(true);
      setUserData({ ...user, confirmPassword: "" });
    } else {
      setIsEditing(false);
      setUserData({
        id: user.id,
        name: user.name,
        email: user.email,
        password: "",
        confirmPassword: "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Submitting user data:", userData);

    try {
      if (isEditing) {
        await axiosInstance.put(`/admin/${userData.id}`, {
          name: userData.name,
          email: userData.email,
          password: userData.password || undefined,
        });
        console.log("User updated:", userData);
      } else {
        await axiosInstance.post("/admin/create", {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: "admin",
        });
        console.log("User created:", userData);
      }
      const response = await axiosInstance.get("/admin/all");
      setUsers(response.data);
    } catch (error) {
      console.error("Error submitting user:", error.response?.data || error);
    }

    closeModal();
  };

  const handleDelete = async (userId) => {
    try {
      await axiosInstance.delete(`/admin/${userId}`);
      console.log("User deleted:", userId);
      const response = await axiosInstance.get("/admin/all");
      setUsers(response.data);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
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
            <th className="text-left py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr className="hover:bg-gray-100" key={user._id}>
              <td className="py-2 px-4 border-b">{user._id}</td>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleModalOpen(user)}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => handleDelete(user._id)}
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
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-2xl mb-4">
              {isEditing ? "Edit User" : "Create User"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              {!isEditing && (
                <>
                  <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                      type="password"
                      value={userData.password}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={userData.confirmPassword}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>
                </>
              )}
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
