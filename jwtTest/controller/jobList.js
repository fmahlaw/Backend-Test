import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const { URLLIST, TOKEN, URLDB, PORT } = process.env;
export let jobListDB;

export default async (req, res) => {
  const { location, description, full_time } = req.query;

  const isFullTime = full_time == "true" ? true : null;

  if (!jobListDB) jobListDB = await axios(URLLIST);

  const result = jobListDB.data.filter((item) => {
    if (location && description && isFullTime) {
      return (
        item.location == location &&
        item.type == "Full Time" &&
        item.description.includes(description)
      );
    } else if (location && isFullTime) {
      return item.location == location && item.type == "Full Time";
    } else if (location && description) {
      return (
        item.location == location && item.description.includes(description)
      );
    } else if (description) return item.description.includes(description);
    else if (location) return item.location == location;
    else if (isFullTime) return item.type == "Full Time";
    else return item;
  });

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (!(page && limit)) return res.send(result);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const resultPagination = result.slice(startIndex, endIndex);
  let remainingContent = result.length - page * limit;

  remainingContent > 0 ? remainingContent : (remainingContent = 0);

  if (page * limit > result.length + 3) return res.send("page not found");

  res.send({
    page,
    remainingContent,
    Total: result.length,
    resultPagination,
  });
};
