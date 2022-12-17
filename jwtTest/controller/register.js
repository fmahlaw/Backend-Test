import userModel from "./db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { TOKEN } from "../app.js";

export default async (req, res) => {
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
    TOKEN
  );

  user.save();
  res.send(jwtUser);
};
