import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/index.js";
import routes from "./routes/index.js";
import connectDB from "./DB/connectDB.js";
import helmet from "helmet";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(helmet());

app.use(cookieParser());

app.use("/api", routes);

//async iife function
(async () => {
  try {
    await connectDB(config.MONGODB_URL);
    console.log("DB Connected");

    //we need to add this before listen so that our app is production ready
    app.on("error", (err) => {
      console.error("Error:", err);
    });

    const onListening = () => {
      console.log(`Listening on port ${config.PORT}`);
    };

    app.listen(config.PORT, onListening);
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
})();
