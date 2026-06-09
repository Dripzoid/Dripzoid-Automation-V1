import { TEMPLATE_IDS }
  from "../../config/templateIds.js";

import { createTemplateHandler }
  from "./createTemplateHandler.js";


export const returnRequestedHandler =
  createTemplateHandler(
    TEMPLATE_IDS.RETURN_REQUESTED
  );

export const returnPickupScheduledHandler =
  createTemplateHandler(
    TEMPLATE_IDS.RETURN_PICKUP_SCHEDULED
  );

export const returnReceivedHandler =
  createTemplateHandler(
    TEMPLATE_IDS.RETURN_RECEIVED
  );

export const refundInitiatedHandler =
  createTemplateHandler(
    TEMPLATE_IDS.REFUND_INITIATED
  );

export const refundProcessedHandler =
  createTemplateHandler(
    TEMPLATE_IDS.REFUND_PROCESSED
  );