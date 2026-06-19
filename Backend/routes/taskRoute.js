import express from "express";
import { addTask, getAllTaskForReporter, getAllTaskForUser, getTaskById } from "../controller/taskController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isReporter from "../middlewares/isReporter.js";

const router = express.Router();

router.route("/add").post(isAuthenticated, isReporter, addTask);

router.route("/user/get/all").post(isAuthenticated, getAllTaskForUser);

router.route("/reporter/get/all").post(isAuthenticated, isReporter, getAllTaskForReporter);

router.route("/get/:id").get(isAuthenticated, getTaskById);

export default router;