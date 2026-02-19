import express from "express";
import cors from "cors";
import helmet from "helmet";
import apiRoutes from "./routes/index.js";
import env from "./config/env.js";
import { corsConfig } from "./config/cors.js";
import { requestLogger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors(corsConfig));
app.use(express.json());
app.use(requestLogger);

app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "EMI platform API" });
});

app.use(errorHandler);

export default app;
