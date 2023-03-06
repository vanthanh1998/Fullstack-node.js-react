import express from "express";
import bodyParser from "body-parser";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors"

require('dotenv').config();

let app = express()
// app.use(cors({ origin: true }));
app.use(cors({ credentials: true, origin: true })); // dcm

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

configViewEngine(app);
initWebRoutes(app);
connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
  // callback
  console.log("Run node the port: " + port);
})