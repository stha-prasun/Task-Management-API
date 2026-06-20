import mongoose from "mongoose";

const taskModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    project: {
      type: String,
      trim: true,
    },

    dueDate: {
      type: Date,
    },

    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reporter",
      required: true,
    },

    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskModel);