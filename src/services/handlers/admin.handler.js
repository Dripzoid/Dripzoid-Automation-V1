import { TEMPLATE_IDS }
  from "../../config/templateIds.js";

import { createTemplateHandler }
  from "./createTemplateHandler.js";


export const lowStockHandler =
  createTemplateHandler(
    TEMPLATE_IDS.LOW_STOCK
  );

export const outOfStockHandler =
  createTemplateHandler(
    TEMPLATE_IDS.OUT_OF_STOCK
  );

export const systemErrorHandler =
  createTemplateHandler(
    TEMPLATE_IDS.SYSTEM_ERROR
  );

export const dailyReportHandler =
  createTemplateHandler(
    TEMPLATE_IDS.DAILY_REPORT
  );

export const weeklyReportHandler =
  createTemplateHandler(
    TEMPLATE_IDS.WEEKLY_REPORT
  );

export const monthlyReportHandler =
  createTemplateHandler(
    TEMPLATE_IDS.MONTHLY_REPORT
  );