var nodemailer = require('nodemailer');
const config = require('../config');
const { request } = require('express');

exports.sendEmail = (emailObj, res, attachment = null) => {
    const transport = nodemailer.createTransport({
        host: config.EMAIL_HOST,
        secureConnection: false,
        port: 587,
        tls: {
          rejectUnauthorized: false
        },
        auth: {
          //sender
          user: config.EMAIL_AUTH_USER,
          pass: config.EMAIL_AUTH_PASSWORD
        },
        debug: true
      });
      const message = {
        //receiver
        from: emailObj.email,
        to: config.EMAIL_AUTH_USER,
        subject: emailObj.subject,
        text: emailObj.content
      };

      if(emailObj.subject === 'Bulkcom Shipping Login Details') {
        message.to = emailObj.email
      }
      
      if (attachment) {
        message.attachments = [
          {
            filename: attachment.name,
            path: attachment.path,
          }
        ]
      }
      return transport.sendMail(message, (err, data) => {
        if (err) {
          res.json({
            status: false
          })
        } else {
          res.json({
           status: true
          })
        }
      });
}