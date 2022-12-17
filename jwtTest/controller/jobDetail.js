import { jobListDB } from "../app.js";

export default async (req, res) => {
  const id = req.params.id;

  const result = jobListDB.data.find((item) => item.id == id);

  if (result) res.send(result);
  else return res.send("not found");
};
