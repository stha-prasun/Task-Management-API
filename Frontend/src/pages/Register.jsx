import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { REPORTER_API_ENDPOINT, USER_API_ENDPOINT } from "../utils/constants";

const Signup = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const endpoint =
        input.role === "user" ? USER_API_ENDPOINT : REPORTER_API_ENDPOINT;

      const res = await axios.post(
        `${endpoint}/signup`,
        {
          fullname: input.fullname,
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
          fullname: "",
          email: "",
          password: "",
          role: "user",
        });

        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">Create Account</h1>
          <p className="text-sm mt-2 text-gray-500">
            Register as a User or Reporter
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="label font-medium">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full"
              value={input.fullname}
              name="fullname"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              value={input.email}
              name="email"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label font-medium">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              value={input.password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label font-medium">Register As</label>

            <div className="flex gap-6 mt-2">
              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={input.role === "user"}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                <span>User</span>
              </label>

              <label className="label cursor-pointer gap-2">
                <input
                  type="radio"
                  name="role"
                  value="reporter"
                  checked={input.role === "reporter"}
                  onChange={handleChange}
                  className="radio radio-primary"
                />
                <span>Reporter</span>
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full text-base">
            Sign Up
          </button>
        </form>

        <div className="divider">OR</div>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
