require('dotenv').config()
const nodemailer = require('nodemailer')
const Email = require('email-templates')
const email = new Email()
const path = require('path')

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.BASE_EMAIL,
    pass: process.env.BASE_EMAIL_PASSWORD,
  },
})

function loadTemplate(templateName, context) {
  return new Promise((resolve, reject) => {
    email
      .render(
        path.join(
          process.cwd(),
          `${process.env.FILE_SRC}/template`,
          templateName
        ),
        context
      )
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error.message)
      })
  })
}
async function sendEmail(to, subject, templatePath, data) {
  let template = await loadTemplate(templatePath, data)

  const mailOptions = {
    from: process.env.BASE_EMAIL,
    to: to,
    subject: subject,
    html: template,
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error)
      } else {
        resolve('Email sent: ' + info.response)
      }
    })
  })
}

module.exports = { sendEmail }
