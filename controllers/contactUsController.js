const emailUtil = require("../utils/email");

exports.sendEmail = (req, res) => {
  const { name, email, message, subject } = req.body.data;

  const content = `Name: ${name} \nE-mail: ${email} \n\nMessage:\n${message} `;

  let emailObj = {
    email,
    subject,
    content,
  };

  emailUtil.sendEmail(emailObj, res);
}