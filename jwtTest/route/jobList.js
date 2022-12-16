import express from "express";
import jobList from "../controller/jobList.js";
import jobDetail from "../controller/jobDetail.js";

const router = express.Router();

router.post("/joblist", jobList);
router.post("/joblist/:id", jobDetail);

export default router;
