// services/emailService.js

import { createTransport } from "nodemailer";

const mailTransporter = createTransport({
  service: "gmail",
  auth: {
    user: "shreyansh.socialseller@gmail.com",
    pass: "hjdn hska uklf myay",
  },
});

const mailSender = ({ to, subject, html }) => {
  console.log("entered mailSender")
  const details = {
    from: "shreyansh.socialseller@gmail.com",
    to: to,
    subject: subject,
    html: html,
  };
  return mailTransporter.sendMail(details);
};

export default {
  mailSender,
};
