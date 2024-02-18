import express from "express";
import {
  createNewTask,
  deleteTask,
  editTask,
  getAllTasks,
  updateTask,
} from "../controllers/task.controller.js";
import { verifyToken } from "../middelware/verifyToken.js";
const router = express.Router();

router.post("/create", verifyToken, createNewTask);
router.patch("/update/:id", verifyToken, updateTask);
router.delete("/delete/:id", verifyToken, deleteTask);
router.get("/get/:id", verifyToken, getAllTasks);
router.get("/edit/:id", verifyToken, editTask);

export default router;
