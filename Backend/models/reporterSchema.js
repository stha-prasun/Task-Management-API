import mongoose from "mongoose";

const reporterModel = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["reporter"],
      default: "reporter",
    },
    task: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true },
);

export const Reporter = mongoose.model("Reporter", reporterModel);
