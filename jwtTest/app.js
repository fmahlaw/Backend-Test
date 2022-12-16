import express from "express";

import JwtAuth from "./middleware/jwtAuth.js";
import loginRoute from "./route/loginRoute.js"
import registerRoute from "./route/registerRoute.js"
import joblistRoute from "./route/jobList.js"
import { PORT } from "./controller/jobList.js";

const app = express();

export let job = ''

app.use(express.json());

app.use("/", registerRoute)

app.use("/", JwtAuth, loginRoute )

app.use("/", JwtAuth, joblistRoute)


app.listen(PORT);

