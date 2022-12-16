import express from "express";
import login from "../controller/login.js";

const router = express.Router();

router.post("/user/login", login);

export default router;
