import mongoose from "mongoose"
import {URLDB} from "./jobList.js"

mongoose.set("strictQuery", true);
mongoose.connect(URLDB);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

export default mongoose.model("user", userSchema);