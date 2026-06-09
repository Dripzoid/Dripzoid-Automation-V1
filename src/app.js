import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import healthRoutes from "./routes/health.routes.js";
import eventRoutes from "./routes/event.routes.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: [
      "https://api.dripzoid.com",
    ],
    credentials: true,
  })
);

app.use(morgan("dev"));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/health", healthRoutes);
app.use("/api/events", eventRoutes);

export default app;
