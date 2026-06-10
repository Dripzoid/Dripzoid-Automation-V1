import cron from "node-cron";

import {
  getPendingTasks,
  updateTask,
  createLog,
} from "../services/scheduler.service.js";

import { processEvent }
  from "../services/event.service.js";

export function startRetryScheduler() {
  console.log("🔄 Retry Scheduler Started");
  cron.schedule("*/5 * * * *", async () => {
    console.log(
      "🔄 Running Retry Scheduler"
    );

    try {
      const tasks =
        await getPendingTasks();

      for (const task of tasks) {
        try {
          if (
            task.taskType !==
            "RETRY_AUTOMATION_EVENT"
          ) {
            continue;
          }

          const {
            eventType,
            payload,
          } = task.payload;
          console.log(
  "TASK PAYLOAD:",
  JSON.stringify(task.payload, null, 2)
);

console.log("eventType:", eventType);
console.log("payload:", payload);
          await processEvent(
            eventType,
            payload
          );

          await updateTask(
            task.id,
            {
              status: "completed",
              executedAt: new Date(),
            }
          );

          await createLog({
            level: "info",
            service:
              "retry-scheduler",
            message:
              "Task completed",
            metadata: {
              taskId: task.id,
              eventType,
            },
          });
        } catch (error) {
          const retries =
            task.retryCount + 1;

          if (retries >= 5) {
            await updateTask(
              task.id,
              {
                status: "failed",
                lastError:
                  error.message,
                retryCount:
                  retries,
              }
            );
          } else {
            await updateTask(
              task.id,
              {
                retryCount:
                  retries,
                lastError:
                  error.message,
              }
            );
          }

          await createLog({
            level: "error",
            service:
              "retry-scheduler",
            message:
              error.message,
            metadata: {
              taskId: task.id,
            },
          });
        }
      }
    } catch (error) {
      console.error(
        "Scheduler Error:",
        error.message
      );
    }
  });
}
