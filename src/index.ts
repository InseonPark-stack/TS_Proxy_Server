import express, { Request, Response, json, urlencoded } from "express";
import routers from "./routers/route";
import path from "path";
import cors from "cors";

const app = express();
const port = 3003;

// cors
app.use(cors());

// data type : json
app.use(json());
app.use(urlencoded({ extended: true }));

// router
app.use(routers);

// define static path
app.use(express.static(path.join(__dirname, "my-react-pjt/build")));
app.use(express.static(path.join(__dirname, "Kore_bot_SDKApp/sdk/UI")));
app.use(express.static(path.join(__dirname, "Kore_bot_SDKApp/sdk")));
app.use(express.static(path.join(__dirname, "Kore_bot_SDKApp/sdk/main")));
app.use(express.static(path.join(__dirname, "Kore_bot_SDKApp/sdk/libs")));

app.listen(port, () => {
  console.log(`I just changed this log: http://localhost:${port}`);
});
