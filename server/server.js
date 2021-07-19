import express from "express"; // backend api
import axios from "axios"; // requests!
import dueDateRouter from "./routes/dueDateScript.js";

// MIDDLEWARE!
import cors from "cors"; // enforce CORS, will be set to frontend URL when deployed
import morgan from "morgan"; // useful for tracking request logs
import helmet from "helmet"; // ensures max security for server
import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });

const port = process.env.PORT || 5000;
const app = express();
const root = 'localhost';
app.use(morgan("common"));
app.use(cors());
app.use(helmet());
app.listen(5000, function () {
  console.log(`server starting on ${root}:${port}...`);
});

app.use('', dueDateRouter)