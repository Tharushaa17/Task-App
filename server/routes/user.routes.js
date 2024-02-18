import express from "express";
import { profile } from "../controllers/users.controllers.js";
import { verifyToken } from "../middelware/verifyToken.js";
const router = express.Router();

router.get("/profile/:id", verifyToken, profile);

export default router;