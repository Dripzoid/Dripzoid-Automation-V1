// src/schedulers/retry.scheduler.js

import cron from "node-cron";

import {
  getPendingTasks,
  updateTask,
  createLog,
} from "../services/scheduler.service.js";

import {
  processEvent,
} from "../services/event.service.js";

export function startRetryScheduler() {
  console.log(
    "🔄 Retry Scheduler Started"
  );

  cron.schedule("*/5 * * * *", async () => {
    console.log(
      "🔄 Running Retry Scheduler"
    );

    try {
      const tasks =
        await getPendingTasks();

      console.log(
        `📦 Found ${tasks.length} pending task(s)`
      );

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
            JSON.stringify(
              task.payload,
              null,
              2
            )
          );

          console.log(
            "eventType:",
            eventType
          );

          console.log(
            "payload:",
            payload
          );

          // IMPORTANT FIX
          const result =
            await processEvent({
              eventType,
              payload,
            });

          // processEvent returns success:false
          // instead of throwing
          if (!result.success) {
            throw new Error(
              result.error
            );
          }

          await updateTask(
            task.id,
            {
              status: "completed",
              executedAt:
                new Date(),
              lastError: null,
            }
          );

          await createLog({
            level: "info",
            service:
              "retry-scheduler",
            message:
              "Task completed successfully",
            metadata: {
              taskId: task.id,
              eventType,
            },
          });

          console.log(
            `✅ Task ${task.id} completed`
          );
        } catch (error) {
          console.error(
            `❌ Task ${task.id} failed:`,
            error.message
          );

          const retries =
            task.retryCount + 1;

          if (retries >= 5) {
            await updateTask(
              task.id,
              {
                status: "failed",
                retryCount:
                  retries,
                lastError:
                  error.message,
              }
            );

            console.log(
              `🚫 Task ${task.id} permanently failed`
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

            console.log(
              `🔁 Retry count updated to ${retries}`
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
              retryCount:
                retries,
            },
          });
        }
      }
    } catch (error) {
      console.error(
        "🚨 Scheduler Error:",
        error.message
      );
    }
  });
}
