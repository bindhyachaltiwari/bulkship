const emailUtil = require("../utils/email");
const formidable = require('formidable');

exports.uploadResume = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    const { name, email } = fields;
    const content = `Name: ${name} \nE-mail: ${email} `;

    let emailObj = {
      email,
      subject: 'New Job Application',
      content,
    };

    emailUtil.sendEmail(emailObj, res, files.file);
  });
}