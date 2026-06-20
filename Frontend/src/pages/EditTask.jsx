import React, { useEffect, useState } from "react";
import axios from "axios";
import { TASK_API_ENDPOINT } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import useGetTask from "../hooks/useGetTask";

const EditTask = () => {
  const navigate = useNavigate();
  const reporter = useSelector((store) => store.Reporter.loggedInReporter);

  useEffect(() => {
    if (!reporter) {
      navigate("/login");
    }
  }, []);

  const { id } = useParams();

  useGetTask(id);

  const task = useSelector((store) => store.Task.task?.[0]);

  const [form, setForm] = useState({
    taskId: "",
    title: "",
    description: "",
    priority: "low",
    status: "pending",
    project: "",
    dueDate: "",
    assigneeID: "",
  });

  useEffect(() => {
    if (task) {
      setForm({
        taskId: task._id,
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "low",
        status: task.status || "pending",
        project: task.project || "",
        dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
        assigneeID: task.assignee._id || "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${TASK_API_ENDPOINT}/update`, form, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/reporter/dashboard");
      }
    } catch (err) {
      console.error(err);
      toast(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Task</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded shadow"
      >
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
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTask;
