import React, { useState, useEffect } from "react";
import axios from "axios"; 
import Input from "../Components/input/input";
import Button from "../Components/button/Button";
import { Link, useNavigate } from "react-router-dom"; 
import imgd from "../assets/images/imgAuth.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/Api/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        
        localStorage.setItem("role", response.data.user.role); 
        
        if (response.data.user.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-purple-950 to-purple-500">
      <div className="w-full h-4/6 flex justify-center p-5">
        <div className="w-[40vw] bg-gradient-to-tr from-purple-950 via-purple-800 to-purple-500 rounded-md">
          <img src={imgd} alt="" className="w-96 h-[593PX]" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-1/3 flex flex-col justify-center"
        >
          <h1 className="text-2xl text-center font-semibold mb-4">
            Login to your account
          </h1>
          {error && <p className="text-red-500">{error}</p>}
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
          <Button type="submit">Login</Button>

          <div className="text-center mt-4">
            <span>Create an account? </span>
            <Link to="/register" className="text-purple-600 hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
