import React, { useState, useEffect } from "react";
import axios from "axios";
import Input from "../Components/input/input";
import Button from "../Components/button/Button";
import { Link, useNavigate } from "react-router-dom"; 
import imgd from "../assets/images/imgAuth.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); 
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      
      const response = await axios.post("http://localhost:3000/Api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const { token } = response.data; 

      
      localStorage.setItem("token", token);

      
      navigate("/"); 
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again."); 
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-purple-950 to-purple-500">
      <div className="w-full h-4/6 flex justify-center p-5">
        <div className="w-[40vw] bg-gradient-to-tr from-purple-950 via-purple-800 to-purple-500 rounded-md">
          <img src={imgd} alt="Signup illustration" className="w-96 h-[593px]" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-1/3 flex flex-col justify-center"
        >
          <h1 className="text-2xl text-center font-semibold mb-4">
            Create a New Account
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          <Input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            name="email"
          />
          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            name="password"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            name="confirmPassword"
          />
          <Button type="submit">Signup</Button>

          <div className="text-center mt-4">
            <span>Already have an account? </span>
            <Link to="/login" className="text-purple-600 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
