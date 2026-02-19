import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import apiRoutes from "./routes/index.js";
import env from "./config/env.js";
import { corsConfig } from "./config/cors.js";

const app = express();

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "EMI platform API" });
});

export default app;
