import express from "express";
import { addTask } from "../controller/taskController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isReporter from "../middlewares/isReporter.js";

const router = express.Router();

router.route("/add").post(isAuthenticated, isReporter, addTask);

export default router;