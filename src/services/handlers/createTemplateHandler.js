// src/services/handlers/createTemplateHandler.js

import { sendEmail }
  from "../email.service.js";

export function createTemplateHandler(
  templateId
) {
  return async function ({
    payload,
  }) {

    const {
      email,
      ...templatePayload
    } = payload;

    const result =
      await sendEmail({

        to: email,

        templateId,

        payload: templatePayload,
      });

    return {
      success:
        result.success,

      templateId,

      email,

      providerResponse:
        result,
    };
  };
}