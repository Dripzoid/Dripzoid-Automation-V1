import { TEMPLATE_IDS }
  from "../../config/templateIds.js";

import { createTemplateHandler }
  from "./createTemplateHandler.js";

export const userWelcomeHandler =
  createTemplateHandler(
    TEMPLATE_IDS.USER_WELCOME
  );