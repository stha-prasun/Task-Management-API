import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TASK_API_ENDPOINT } from "../utils/constants";
import { setTasks } from "../redux/tasksSlice";
import toast from "react-hot-toast";

const useGetAllTasksReporter = (filters = {}) => {
  const dispatch = useDispatch();
  const reporter = useSelector((state) => state.Reporter.loggedInReporter);

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.post(
        `${TASK_API_ENDPOINT}/reporter/get/all`,
        {
          id: reporter?._id,
          ...filters,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(setTasks(res.data.task || []));
    } catch (error) {
      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);
      console.log("Sent filters:", filters);
      toast.error(error.response?.data?.message || "Failed to load");
    }
  }, [reporter?._id, dispatch, filters]);

  useEffect(() => {
    if (reporter?._id) {
      fetchTasks();
    }
  }, [reporter?._id, fetchTasks]);

  return fetchTasks;
};

export default useGetAllTasksReporter;