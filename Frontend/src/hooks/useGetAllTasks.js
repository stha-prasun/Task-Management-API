import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TASK_API_ENDPOINT } from "../utils/constants";
import { setTasks } from "../redux/tasksSlice";

const useGetAllTasks = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.User.loggedInUser);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.post(
          `${TASK_API_ENDPOINT}/user/get/all`,
          {
            id: user?._id,
          },
          {
            withCredentials: true,
          },
        );

        if (res.data?.success) {
          dispatch(setTasks(res.data.task));
        }
      } catch (error) {
        console.log("Failed to fetch tasks:", error);
      }
    };

    if (user?._id) {
      fetchTasks();
    }
  }, [user?._id, dispatch]);
};

export default useGetAllTasks;
