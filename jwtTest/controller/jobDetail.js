import axios from "axios";
import {URLLIST} from './jobList.js'

let jobListDB2 = ""
export default async (req, res) => {
  
    if( !jobListDB2) jobListDB2 = await axios(URLLIST)
    
    const id = req.params.id;
  
    const result = jobListDB2.data.find(item => item.id == id);
  
    if (result) res.send(result);
    else return res.send("not found");
  }