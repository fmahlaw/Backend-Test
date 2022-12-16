import userModel from './db.js'
import bcrypt from 'bcrypt'

export default async (req, res) => {
    const { username, password } = req.body;
  
    const user = await userModel.findOne({ username });
    if (!user) return res.send("username not found");
  
    if (await bcrypt.compare(password, user.password)) {
      res.send("login success");
    } else {
      return res.send("wrong password");
    }
  }