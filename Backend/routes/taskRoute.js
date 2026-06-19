import express from "express";
import { addTask, getAllTaskForUser } from "../controller/taskController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isReporter from "../middlewares/isReporter.js";

const router = express.Router();

router.route("/add").post(isAuthenticated, isReporter, addTask);

router.route("/user/get/all").post(isAuthenticated, getAllTaskForUser);

export default router;