import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT;
const url = process.env.URL;
const token = process.env.TOKEN;
const urlJobList =
  "http://dev3.dansmultipro.co.id/api/recruitment/positions.json";
let joblistDB = "";
mongoose.set("strictQuery", true);
mongoose.connect(url);

const userSchema = mongoose.Schema({
  username: String,
  password: String,
});

const userModel = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.send("Hellow");
});

app.post("/user/register", async (req, res) => {
  const { username, password } = req.body;

  const oldUser = await userModel.findOne({ username });

  if (oldUser) return res.send("Use another username");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = userModel({
    username: username,
    password: hashedPassword,
  });

  const jwtUser = await jwt.sign(
    {
      username: username,
      password: hashedPassword,
    },
    token
  );

  user.save();
  res.send(jwtUser);
});

app.post("/user/login", JwtAuth, async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });
  if (!user) return res.send("username not found");

  if (await bcrypt.compare(password, user.password)) {
    res.send("login success");
  } else {
    return res.send("wrong password");
  }
});

app.post("/joblist", JwtAuth, async (req, res) => {
  const { location, description } = req.query;

  console.log(req.params)

  joblistDB = await axios(urlJobList);
  let full_time = " ";
  full_time = req.query.full_time == "true" ? true : null;

  const result = joblistDB.data.filter((item) => {
    if (location && description && full_time) {
      return (
        item.location == location &&
        item.type == "Full Time" &&
        item.description.includes(description)
      );
    } else if (location && full_time) {
      return item.location == location && item.type == "Full Time";
    } else if (location && description) {
      return (
        item.location == location && item.description.includes(description)
      );
    } else if (description) {
      return item.description.includes(description);
    } else if (location) {
      return item.location == location;
    } else if (full_time) {
      return item.type == "Full Time";
    } else {
      return item;
    }
  });

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (!(page && limit)) return res.send(result);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const resultPagination = result.slice(startIndex, endIndex);
  const remainingContent = result.length - page * limit;
  if (page * limit > result.length + 3) return res.send("page not found");

  res.send({
    page,
    remainingContent,
    Total: result.length,
    resultPagination,
  });
});

app.post("/joblist/:id",JwtAuth , async (req,res)=>{

  const urlList = await axios(urlJobList)

  const id =  req.params.id
  
  const result = urlList.data.find(item=> item.id == id)

  if(result) res.send(result)
   else return res.send("not found")

})


async function JwtAuth(req, res, next) {
  const userHeader = req.headers.authorization;
  if (!userHeader) return res.send("submit a token");

  const userToken = userHeader.split(" ")[1];

  try {
    await jwt.verify(userToken, token);
  } catch (error) {
    return res.send("bad token");
  }

  next();
}

app.listen(port);
