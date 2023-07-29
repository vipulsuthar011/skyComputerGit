import express from "express";
import connectToDatabase from "./database/database.js";
import router from "./mainRoutes.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { generateToken } from "./controllers/authController.js";
const port = process.env.PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.json({ limit: "5000mb" }));
app.use(
  express.urlencoded({
    limit: "5000mb",
    extended: true,
    parameterLimit: 50000000,
  })
);
app.use(cors(corsOptions));
app.listen(8000, () => {
  console.log(`server started successfully on ${process.env.PORT}`);
});
// Set up Global configuration access
dotenv.config();
app.use("/api", router);
connectToDatabase();
generateToken();
