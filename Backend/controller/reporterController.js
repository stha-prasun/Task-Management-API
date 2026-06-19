import { Reporter } from "../models/reporterSchema.js";
import { Task } from "../models/taskSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({
        message: "Feilds cannot be left empty",
        success: false,
      });
    }

    const reporter = await Reporter.findOne({ email });

    if (reporter) {
      return res.status(400).json({
        message: "Email Already In Use!!",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Reporter.create({
      fullname,
      email,
      password: hashedPassword,
      role: "reporter",
    });

    return res.status(201).json({
      message: "User created successfully!!",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Fields cannot be left empty!!",
        success: false,
      });
    }

    const reporter = await Reporter.findOne({ email }).populate("task");

    if (!reporter) {
      return res.status(400).json({
        message: "Invalid User",
        success: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password, reporter.password);

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect Email or Password",
        success: false,
      });
    }

    const tokenData = {
      reporterID: reporter._id,
      role: reporter.role,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    const loggedInUser = {
      _id: reporter._id,
      fullname: reporter.fullname,
      email: reporter.email,
      role: reporter.role,
      task: reporter.task,
    };

    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome Back ${reporter.fullname}!!`,
        success: true,
        loggedInUser,
      });
  } catch (error) {
    console.log(error);
  }
};