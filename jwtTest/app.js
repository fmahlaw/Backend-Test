import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const { URLLIST, TOKEN, URLDB, PORT } = process.env;
export let jobListDB;
export const app = express();

(async function GetJobList() {
  jobListDB = await axios(URLLIST);
})();

app.use(express.json());
