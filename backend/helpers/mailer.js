const nodemailer = require('nodemailer');
const emailTemplates = require('email-templates');
const sendMailTransport = require('nodemailer-smtp-transport');

module.exports = {
  _template: null,
  _transport: null,

  initTest: () => new Promise((resolve, reject) =>{
    nodemailer.createTestAccount(async function (err, account) {
      if (err) {
          console.error('Failed to create a testing account. ' + err.message);
          reject(err);
      }
  
      console.log('Credentials obtained, sending message...');
      
      // Create a SMTP transporter object
      const transport = nodemailer.createTransport({
        jsonTransport: true,
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
      });
      resolve(transport); 
    });

  }),
  init: () => new Promise((resolve, reject) =>{
    // Create a SMTP transporter object
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'test978056@gmail.com',
        pass: 'cqlsystesting123'       
      }
    });

    resolve(transport); 
  }),
  send: (transport, from, to, subject, text, attachments, html) => new Promise((resolve, reject) => {
    var params = {
      from: from,
      to: to,
      subject: subject,
      html: text,
      attachments
    };

    if (html) {
      params.html = html;
    }

    transport.sendMail(params, function (err, res) {
      if (err) {
        reject(err);
      } else {
        console.log('res', res);
        resolve(res);
      }
    });
  }),
  sendMail: async function (from, to, subject, content, attachments) {
    var self = this;
       console.log("send email")

    try {
      await this.init().then(async function (transport) {
        await self.send(transport, from, to, subject, content, attachments)
          .then(function (res) {
            console.log('res', res);
            return (res);
          })
          .catch((error) => {
            console.log(error)
            return error;
          
          });
      }.bind(this));
    } catch (e) {
      return e;
    }
  }
};