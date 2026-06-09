// order.handler.js

import { TEMPLATE_IDS }
  from "../../config/templateIds.js";

import { createTemplateHandler }
  from "./createTemplateHandler.js";

export const orderCreatedHandler =
  createTemplateHandler(
    TEMPLATE_IDS.ORDER_CREATED
  );

export const orderPackedHandler =
  createTemplateHandler(
    TEMPLATE_IDS.ORDER_PACKED
  );

export const orderShippedHandler =
  createTemplateHandler(
    TEMPLATE_IDS.ORDER_SHIPPED
  );

export const orderOutForDeliveryHandler =
  createTemplateHandler(
    TEMPLATE_IDS.ORDER_OUT_FOR_DELIVERY
  );

export const orderDeliveredHandler =
  createTemplateHandler(
    TEMPLATE_IDS.ORDER_DELIVERED
  );

export const orderCancelledHandler =
  createTemplateHandler(
    TEMPLATE_IDS.ORDER_CANCELLED
  );