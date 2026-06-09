// src/services/email.service.js

import axios from "axios";

export async function sendEmail({
  to,
  templateId,
  payload = {},
}) {
  try {

    const requestBody = {
      template_id: templateId,

      to: [
        {
          email: to,
          name: payload.customer_name || to,
        },
      ],

      from: {
        email:
          process.env.MSG91_FROM_EMAIL,

        name:
          process.env.MSG91_FROM_NAME,
      },

      variables: payload,
    };

    console.log(
      "MSG91 Request:",
      JSON.stringify(
        requestBody,
        null,
        2
      )
    );

    const response =
      await axios.post(
        "https://control.msg91.com/api/v5/email/send",
        requestBody,
        {
          headers: {
            authkey:
              process.env.MSG91_AUTH_KEY,

            "Content-Type":
              "application/json",
          },
        }
      );

    return {
      success: true,
      data: response.data,
    };

  } catch (error) {

    console.error(
      "MSG91 Email Error:",
      error?.response?.data ||
      error.message
    );

    return {
      success: false,
      error:
        error?.response?.data ||
        error.message,
    };
  }
}