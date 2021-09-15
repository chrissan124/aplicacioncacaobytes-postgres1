require('dotenv').config()
const { generate } = require('generate-password')

function generatePassword() {
  return generate({
    length: process.env.PASSWORD_LENGTH,
    numbers: true,
    uppercase: true,
    symbols: true,
    lowercase: true,
  })
}

module.exports = generatePassword
