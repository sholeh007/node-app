import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "372d6d0d9a65a7",
    pass: "9cc3f79b5f6a82",
  },
});

export default transport;
