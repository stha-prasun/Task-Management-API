import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetAllTasksReporter from "../hooks/useGetAllTasksReporter";
import ReporterTaskCard from "../components/ReporterTaskCard";

const ReporterDashboard = () => {
  const reporter = useSelector((store) => store.Reporter.loggedInReporter);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    assignee: "",
    project: "",
    before: "",
    after: "",
  });

  useEffect(() => {
    if (!reporter) {
      navigate("/login");
    }
  }, [reporter, navigate]);

  const refetchTasks = useGetAllTasksReporter(filters);

  const tasks = useSelector((state) => state.Tasks?.tasks);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">My Tasks Dashboard</h1>

      <button
        onClick={() => navigate("/reporter/task/add")}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Task
      </button>

      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="select select-bordered"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
          className="select select-bordered"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <input
          type="text"
          placeholder="AssigneeID"
          value={filters.assignee}
          onChange={(e) => setFilters({ ...filters, assignee: e.target.value })}
          className="input input-bordered"
        />

        <input
          type="text"
          placeholder="Project"
          value={filters.project}
          onChange={(e) => setFilters({ ...filters, project: e.target.value })}
          className="input input-bordered"
        />

        <input
          type="date"
          value={filters.after}
          onChange={(e) => setFilters({ ...filters, after: e.target.value })}
          className="input input-bordered"
        />

        <input
          type="date"
          value={filters.before}
          onChange={(e) => setFilters({ ...filters, before: e.target.value })}
          className="input input-bordered"
        />
      </div>

      {tasks?.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No tasks found</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tasks?.map((task) => (
            <ReporterTaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReporterDashboard;
