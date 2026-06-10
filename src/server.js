import dotenv from "dotenv";
import app from "./app.js";
import { startRetryScheduler } from "./schedulers/retry.scheduler.js";

dotenv.config();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(
    `🚀 Dripzoid Automation running on port ${PORT}`
  );
  console.log("Before scheduler");

startRetryScheduler();

console.log("After scheduler");
});
