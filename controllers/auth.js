"use strict";

exports.register = (req, res) => {
  const { email, text } = req.body;
  const person = req.body.name;
  console.log(`name: ${person} email: ${email} text: ${text}`);

  const nodemailer = require("nodemailer");

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: process.env.MAIL_SECURE, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME, // generated ethereal user
        pass: process.env.MAIL_PASSWORD, // generated ethereal password
      },
    });

    let htmlMsg = text;
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Jim 👻" <jim@programmingbc.com>', // sender address
      to: email, // list of receivers
      subject: "Testing", // Subject line
      text: text, // plain text body
      html: htmlMsg, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};
