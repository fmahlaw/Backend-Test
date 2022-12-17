import { app } from "./app.js";
import JwtAuth from "./middleware/jwtAuth.js";
import loginRoute from "./route/loginRoute.js";
import registerRoute from "./route/registerRoute.js";
import joblistRoute from "./route/jobList.js";
import { PORT } from "./app.js";

app.use("/", registerRoute);

app.use("/", JwtAuth, loginRoute);

app.use("/", JwtAuth, joblistRoute);

app.listen(PORT);
