import express from "express";
import { addTask, deleteTask, getAllTaskForReporter, getAllTaskForUser, getFilteredTasks, getTaskById, updateTask } from "../controller/taskController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isReporter from "../middlewares/isReporter.js";
import { isOwner } from "../middlewares/isOwner.js";

const router = express.Router();

router.route("/add").post(isAuthenticated, isReporter, addTask);

router.route("/user/get/all").post(isAuthenticated, getAllTaskForUser);

router.route("/reporter/get/all").post(isAuthenticated, isReporter, getAllTaskForReporter);

router.route("/get/:id").get(isAuthenticated, getTaskById);

router.route("/update").put(isAuthenticated, isReporter, isOwner, updateTask);

router.route("/delete").delete(isAuthenticated, isReporter, isOwner, deleteTask);

router.get("/filter", isAuthenticated, getFilteredTasks);

export default router;