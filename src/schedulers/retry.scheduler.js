import cron from "node-cron";

import {
  getPendingAutomationEvents,
  getAutomationEventById,
  updateAutomationEvent,
} from "../services/scheduler.service.js";

import {
  processEvent,
} from "../services/event.service.js";

export function startRetryScheduler() {
  console.log(
    "🔄 Automation Retry Scheduler Started"
  );

  cron.schedule(
    "*/5 * * * *",
    async () => {
      console.log(
        "🔄 Running Automation Retry Scheduler"
      );

      try {
        const events =
          await getPendingAutomationEvents();

        console.log(
          `📦 Found ${events.length} pending automation event(s)`
        );

        for (const event of events) {
          let latestEvent = null;

          try {
            latestEvent =
              await getAutomationEventById(
                event.id
              );

            if (
              !latestEvent ||
              latestEvent.status !==
                "pending"
            ) {
              continue;
            }

            console.log(
              `🚀 Retrying ${event.eventType}`
            );

            const result =
              await processEvent({
                eventType:
                  event.eventType,
                payload: {
                  automationEventId:
                    event.id,
                  ...event.payload,
                },
              });

            if (
              result &&
              result.success === false
            ) {
              throw new Error(
                result.error ||
                  "Event processing failed"
              );
            }

            await updateAutomationEvent(
              event.id,
              {
                status: "completed",
                processedAt:
                  new Date(),
                lastError: null,
                retryCount: 0,
              }
            );

            console.log(
              `✅ Event ${event.id} completed`
            );
          } catch (error) {
            const retries =
              (latestEvent?.retryCount ||
                0) + 1;

            console.error(
              `❌ Event ${event.id} failed`,
              error.message
            );

            if (retries >= 5) {
              await updateAutomationEvent(
                event.id,
                {
                  status: "failed",
                  retryCount:
                    retries,
                  lastError:
                    error.message,
                }
              );

              console.log(
                `🚫 Event ${event.id} permanently failed`
              );
            } else {
              await updateAutomationEvent(
                event.id,
                {
                  retryCount:
                    retries,
                  lastError:
                    error.message,
                }
              );

              console.log(
                `🔁 Event ${event.id} retry count updated to ${retries}`
              );
            }
          }
        }
      } catch (error) {
        console.error(
          "🚨 Retry Scheduler Error:",
          error.message
        );
      }
    }
  );
}
