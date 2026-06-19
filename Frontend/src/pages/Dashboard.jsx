import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskCard from "../../components/TaskCard";
import useGetAllTasks from "../../hooks/useGetAllTasks";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((store) => store.User.loggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useGetAllTasks();

  const tasks = useSelector((state) => state.Tasks?.tasks);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">My Tasks Dashboard</h1>

      {tasks?.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">No tasks found</div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tasks?.map((task) => (
            <TaskCard key={task?._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
