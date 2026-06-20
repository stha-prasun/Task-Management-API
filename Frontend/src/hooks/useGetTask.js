import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TASK_API_ENDPOINT } from "../utils/constants";
import { setTask } from "../redux/taskSlice";

const useGetTask = (id) => {
  const dispatch = useDispatch();

  const fetchTask = useCallback(async () => {
    try {
      const response = await axios.get(`${TASK_API_ENDPOINT}/get/${id}`, {
        withCredentials: true,
      });

      if (response.data?.success) {
        dispatch(setTask(response.data.task));
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id) {
      fetchTask();
    }
  }, [id, fetchTask]);

  return fetchTask;
};

export default useGetTask;