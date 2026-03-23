import { resendClient, sender } from "../lib/resend.js";
import { ENV } from "../lib/env.js";
import {
  createResetPasswordEmailTemplate,
  createWelcomeEmailTemplate,
} from "../emails/emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const recipient =
    ENV.NODE_ENV === "development" && ENV.EMAIL_TEST_TO
      ? ENV.EMAIL_TEST_TO
      : email;

  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: recipient,
    subject: "Welcome to Chatify!",
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }

  console.log("Welcome Email sent successfully", {
    requestedRecipient: email,
    deliveredRecipient: recipient,
    id: data?.id,
  });
};

export const sendResetPasswordEmail = async (email, name, resetUrl) => {
  const recipient =
    ENV.NODE_ENV === "development" && ENV.EMAIL_TEST_TO
      ? ENV.EMAIL_TEST_TO
      : email;

  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: recipient,
    subject: "Reset your Chatify password",
    html: createResetPasswordEmailTemplate(name, resetUrl),
  });

  if (error) {
    console.error("Error sending reset password email:", error);
    throw new Error("Failed to send reset password email");
  }

  console.log("Reset password email sent successfully", {
    requestedRecipient: email,
    deliveredRecipient: recipient,
    id: data?.id,
  });
};
