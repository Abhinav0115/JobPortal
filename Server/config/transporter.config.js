import nodemailer from 'nodemailer'

import config from './index.js'

const transporter = nodemailer.createTransport({

    service:'gmail',
    auth: {
      user: config.SMTP_MAIL_USERNAME, // generated ethereal user
      pass: config.SMTP_MAIL_PASSWORD, // generated ethereal password
    },
  });


export default transporter;