import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { REPORTER_API_ENDPOINT, USER_API_ENDPOINT } from "../utils/constants";
import { setLoggedInUser } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        input.role === "user" ? USER_API_ENDPOINT : REPORTER_API_ENDPOINT;

      const res = await axios.post(
        `${endpoint}/login`,
        {
          email: input.email,
          password: input.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res.data.success) {
        setInput({
          email: "",
          password: "",
          role: "user",
        });

        toast.success(res.data.message);

        dispatch(setLoggedInUser(res.data.loggedInUser));

        if (res.data.loggedInUser.role == "user") {
          navigate("/user/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="rounded-2xl w-full max-w-md p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">Welcome Back</h1>
          <p className="text-sm mt-1 text-gray-500">Login to continue</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Role */}
          <div>
            <label className="label font-medium">Login As</label>

            <select
              name="role"
              value={input.role}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="user">User</option>
              <option value="reporter">Reporter</option>
            </select>
          </div>

          {/* Email */}
          <div>
            <label className="label font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </div>

          {/* Password */}
          <div>
            <label className="label font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input input-bordered w-full"
            />

            <label className="label justify-end">
              <Link
                to="/forgot"
                className="text-sm text-primary font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </label>
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-primary w-full text-base">
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="divider">OR</div>

        {/* Google */}
        <button className="btn btn-outline w-full">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>

        {/* Register */}
        <p className="text-sm text-center">
          New here?{" "}
          <Link
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
