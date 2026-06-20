import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome To Home</h1>
        <p className="mt-2">Please login</p>
        <button
          onClick={() => navigate("/login")}
          className="btn btn-primary mt-4"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
