import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TASK_API_ENDPOINT } from "../utils/constants";
import toast from "react-hot-toast";
import useGetAllTasksReporter from "../hooks/useGetAllTasksReporter";

const ReporterTaskCard = ({ task }) => {
  const navigate = useNavigate();
  const refetchTasks = useGetAllTasksReporter();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.delete(`${TASK_API_ENDPOINT}/delete`, {
        data: {
          taskId: task._id,
        },
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        refetchTasks();
      }
    } catch (error) {}
  };

  return (
    <div className="card bg-base-100 shadow-md w-96 h-96">
      <figure>
        <img src="/bg.jpg" alt="task" />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{task.title}</h2>

        <p className="text-sm text-gray-500">{task.description}</p>

        {/* Tags */}
        <div className="flex gap-2 mt-2">
          <div className="badge badge-outline">{task.priority}</div>
          <div className="badge badge-outline">{task.status}</div>
        </div>

        {/* Buttons */}
        <div className="card-actions justify-end mt-3">
          <button
            onClick={() => navigate(`/task/${task._id}`)}
            className="btn btn-sm btn-outline btn-info"
          >
            View
          </button>
          <button className="btn btn-sm btn-outline btn-warning">Edit</button>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-outline btn-error"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReporterTaskCard;
