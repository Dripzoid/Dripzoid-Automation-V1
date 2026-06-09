// src/services/event.service.js

import { handlers } from "./handlers/index.js";

export async function processEvent({
  eventType,
  payload,
  metadata = {},
}) {
  try {
    if (!eventType) {
      throw new Error(
        "eventType is required"
      );
    }

    const handler =
      handlers[eventType];

    if (!handler) {
      throw new Error(
        `No handler registered for event: ${eventType}`
      );
    }

    const eventData = {
      eventType,

      payload,

      metadata: {
        source:
          metadata.source ||
          "unknown",

        timestamp:
          new Date().toISOString(),

        ...metadata,
      },
    };

    console.log(
      `[EVENT START] ${eventType}`
    );

    const result =
      await handler(eventData);

    console.log(
      `[EVENT SUCCESS] ${eventType}`
    );

    return {
      success: true,

      eventType,

      templateId:
        result?.templateId,

      data: result,
    };
  } catch (error) {
    console.error(
      `[EVENT ERROR] ${eventType}`,
      error
    );

    return {
      success: false,

      eventType,

      error: error.message,
    };
  }
}