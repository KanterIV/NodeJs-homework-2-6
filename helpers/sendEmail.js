const nodemailer = require("nodemailer");
require("dotenv").config();

const { MAILJET_USER, MAILJET_PASSWORD } = process.env;

const nodemailreConfig = {
  host: "in-v3.mailjet.com",
  port: 465,
  secure: true,
  auth: { user: MAILJET_USER, pass: MAILJET_PASSWORD },
};

const transport = nodemailer.createTransport(nodemailreConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: '"ContactsHub" <kanterigor@gmail.com>' };
  await transport
    .sendMail(email)
    .then(() => {
      console.log("Email send success");
    })
    .catch((error) => console.log(error.message));
  return true;
};

module.exports = sendEmail;
