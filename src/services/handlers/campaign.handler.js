import { TEMPLATE_IDS }
  from "../../config/templateIds.js";

import { createTemplateHandler }
  from "./createTemplateHandler.js";


export const feedbackRequestHandler =
  createTemplateHandler(
    TEMPLATE_IDS.FEEDBACK_REQUEST
  );

export const cartRecoveryHandler =
  createTemplateHandler(
    TEMPLATE_IDS.CART_RECOVERY
  );

export const promoCampaignHandler =
  createTemplateHandler(
    TEMPLATE_IDS.PROMO_CAMPAIGN
  );

export const newDropAlertHandler =
  createTemplateHandler(
    TEMPLATE_IDS.NEW_DROP_ALERT
  );