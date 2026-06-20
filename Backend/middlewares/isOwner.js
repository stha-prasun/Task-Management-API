import { Task } from "../models/taskSchema.js";
import jwt from "jsonwebtoken";

export const isOwner = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decode.role !== "reporter") {
      return res.status(401).json({
        message: "Invalid permissions",
        success: false,
      });
    }

    const { taskId } = req.body;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (decode.reporterID.toString() !== task.reporter.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to perform this action",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
