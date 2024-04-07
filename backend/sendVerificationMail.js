const { Resend } = require("resend");
require("dotenv").config();
const { RESEND_TOKEN } = process.env;

const resend = new Resend(RESEND_TOKEN);

const sendVerificationMail = async (recipient, link) => {
  const { data, error } = await resend.emails.send({
    from: "Vibhu <onboarding@resend.dev>",
    to: [recipient],
    subject: "Account Verification",
    html:
      "<p>Thanks for creating an account. " +
      "Please follow the link to verify your email.</p>" +
      `<a href="${link}">${link}</a>`,
  });

  if (error) {
    console.log(`EmailError: unable to send email: ${error.message}`);
    return false;
  }
  return true;
};

module.exports = { sendVerificationMail };
