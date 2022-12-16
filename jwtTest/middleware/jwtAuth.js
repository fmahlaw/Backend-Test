import  jwt  from "jsonwebtoken";
import { TOKEN } from "../controller/jobList.js";

export default async function JwtAuth(req, res, next) {
    const userHeader = req.headers.authorization;
    if (!userHeader) return res.send("submit a token");
    
    const userToken = userHeader.split(" ")[1];
  
    try {
      await jwt.verify(userToken, TOKEN);
    } catch (error) {
      return res.send("bad token");
    }
  
    next();
  }