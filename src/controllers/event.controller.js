// src/controllers/event.controller.js

import { processEvent }
  from "../services/event.service.js";

export async function receiveEvent(
  req,
  res
) {
  try {
    const {
      eventType,
      payload,
    } = req.body;

    const result =
      await processEvent({
        eventType,
        payload,

        metadata: {
          source: "api",
        },
      });

    return res.status(
      result.success ? 200 : 400
    ).json(result);

  } catch (error) {

    console.error(
      "[CONTROLLER ERROR]",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        "Internal server error",

      error:
        error.message,
    });
  }
}