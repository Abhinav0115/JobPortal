import config from '../config/index.js'
import transporter from '../config/transporter.config.js'

const mailHelper = async (option) => {

    console.log(option)
    const message  = {
        from: config.SMTP_SENDER_EMAIL,
        to:option.email,
        subject:option.subject,
        html:option.htmlMessage
    }
    await transporter.sendMail(message)
}

export default mailHelper