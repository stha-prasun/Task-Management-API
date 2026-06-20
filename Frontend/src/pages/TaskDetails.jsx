import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetTask from "../hooks/useGetTask";

const TaskDetails = () => {
  const navigate = useNavigate();

  const user = useSelector((store) => store.User.loggedInUser);

  if (!user) {
    navigate("/login");
  }
  const { id } = useParams();

  useGetTask(id);

  const task = useSelector((store) => store.Task.task[0]);

  console.log(task);

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <p>Loading task...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6 border">
        <h1 className="text-3xl font-bold mb-4">{task.title}</h1>

        <div className="space-y-4">
          <div>
            <h2 className="font-semibold text-gray-700">Description</h2>
            <p className="text-gray-600">{task.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">Status:</span>{" "}
              <span>{task.status}</span>
            </div>

            <div>
              <span className="font-semibold">Priority:</span>{" "}
              <span>{task.priority}</span>
            </div>

            <div>
              <span className="font-semibold">Project:</span>{" "}
              <span>{task.project || "N/A"}</span>
            </div>

            <div>
              <span className="font-semibold">Due Date:</span>{" "}
              <span>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>

            <div>
              <span className="font-semibold">Created At:</span>{" "}
              <span>{new Date(task.createdAt).toLocaleString()}</span>
            </div>

            <div>
              <span className="font-semibold">Last Updated:</span>{" "}
              <span>{new Date(task.updatedAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
