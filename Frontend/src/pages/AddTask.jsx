import React, { useState } from "react";
import axios from "axios";
import { TASK_API_ENDPOINT } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import toast from "react-hot-toast";

const AddTask = () => {
  const navigate = useNavigate();
  const reporter = useSelector((store)=>store.Reporter.loggedInReporter);

  if(!reporter){
    navigate("/login");
  }

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
    project: "",
    dueDate: "",
    reporterID: reporter?._id,
    assigneeID: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${TASK_API_ENDPOINT}/add`,
        form,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast("Task created successfully!");
        navigate("/reporter/dashboard");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Task</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">

        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <input
          name="project"
          placeholder="Project"
          value={form.project}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="assigneeID"
          placeholder="Assignee ID"
          value={form.assigneeID}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;