// src/services/handlers/index.js

import { EVENT_TYPES } from "../../config/eventTypes.js";

import { userWelcomeHandler }
  from "./userWelcome.handler.js";

import {
  orderCreatedHandler,
  orderPackedHandler,
  orderShippedHandler,
  orderOutForDeliveryHandler,
  orderDeliveredHandler,
  orderCancelledHandler,
} from "./order.handler.js";

import {
  feedbackRequestHandler,
  cartRecoveryHandler,
  promoCampaignHandler,
  newDropAlertHandler,
} from "./campaign.handler.js";

import {
  returnRequestedHandler,
  returnPickupScheduledHandler,
  returnReceivedHandler,
  refundInitiatedHandler,
  refundProcessedHandler,
} from "./return.handler.js";

import {
  lowStockHandler,
  outOfStockHandler,
  systemErrorHandler,
  dailyReportHandler,
  weeklyReportHandler,
  monthlyReportHandler,
} from "./admin.handler.js";

export const handlers = {
  [EVENT_TYPES.USER_REGISTERED]:
    userWelcomeHandler,

  [EVENT_TYPES.ORDER_CREATED]:
    orderCreatedHandler,

  [EVENT_TYPES.ORDER_PACKED]:
    orderPackedHandler,

  [EVENT_TYPES.ORDER_SHIPPED]:
    orderShippedHandler,

  [EVENT_TYPES.ORDER_OUT_FOR_DELIVERY]:
    orderOutForDeliveryHandler,

  [EVENT_TYPES.ORDER_DELIVERED]:
    orderDeliveredHandler,

  [EVENT_TYPES.ORDER_CANCELLED]:
    orderCancelledHandler,

  [EVENT_TYPES.FEEDBACK_REQUEST]:
    feedbackRequestHandler,

  [EVENT_TYPES.CART_ABANDONED]:
    cartRecoveryHandler,

  [EVENT_TYPES.PROMO_CAMPAIGN]:
    promoCampaignHandler,

  [EVENT_TYPES.NEW_DROP_ALERT]:
    newDropAlertHandler,

  [EVENT_TYPES.RETURN_REQUESTED]:
    returnRequestedHandler,

  [EVENT_TYPES.RETURN_PICKUP_SCHEDULED]:
    returnPickupScheduledHandler,

  [EVENT_TYPES.RETURN_RECEIVED]:
    returnReceivedHandler,

  [EVENT_TYPES.REFUND_INITIATED]:
    refundInitiatedHandler,

  [EVENT_TYPES.REFUND_PROCESSED]:
    refundProcessedHandler,

  [EVENT_TYPES.LOW_STOCK]:
    lowStockHandler,

  [EVENT_TYPES.OUT_OF_STOCK]:
    outOfStockHandler,

  [EVENT_TYPES.SYSTEM_ERROR]:
    systemErrorHandler,

  [EVENT_TYPES.DAILY_REPORT]:
    dailyReportHandler,

  [EVENT_TYPES.WEEKLY_REPORT]:
    weeklyReportHandler,

  [EVENT_TYPES.MONTHLY_REPORT]:
    monthlyReportHandler,
};