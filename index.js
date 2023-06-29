import express from "express";
import { db, Table } from "./db.config.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import routes from "./routes.js";

const app = express();

dotenv.config();

// webScrape();
//installs the cors package, allowing for communication between the client and server
app.use(cors({}));

//middleware for incoming request bodies
app.use(bodyParser.json());

//the home page address
app.use("/", routes);

//port
const PORT = 3001;

//app listening on port 3001 for incoming requests
app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`);
});
