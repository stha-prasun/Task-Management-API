import { User } from "../models/userSchema.js";
import { Task } from "../models/taskSchema.js";
import { Reporter } from "../models/reporterSchema.js";

export const addTask = async (req, res) => {
  try {
    const {
      title,
      description,
      priority,
      status,
      project,
      dueDate,
      reporterID,
      assigneeID,
    } = req.body;

    if (
      !title ||
      !description ||
      !priority ||
      !project ||
      !dueDate ||
      !reporterID ||
      !assigneeID
    ) {
      return res.status(400).json({
        message: "Fields cannot be left empty",
        success: false,
      });
    }

    const user = await User.findById(assigneeID);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const reporter = await Reporter.findById(reporterID);

    if (!reporter) {
      return res.status(404).json({
        success: false,
        message: "Reporter not found",
      });
    }

    const newTask = new Task({
      title,
      description,
      priority,
      status,
      project,
      dueDate,
      reporter: reporterID,
      assignee: assigneeID,
    });

    await newTask.save();

    user.task.push(newTask._id);
    await user.save();

    reporter.task.push(newTask._id);
    await reporter.save();

    return res.status(201).json({
      message: "Task created successfully!!",
      success: true,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllTaskForUser = async (req, res) => {
  try {
    const { id } = req.body; //user id

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const task = await Task.find({ assignee: id });

    if (task.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No tasks found",
        task: [],
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllTaskForReporter = async (req, res) => {
  try {
    const { id } = req.body; //reporter id

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const task = await Task.find({ reporter: id });

    if (task.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No tasks found",
        task: [],
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
