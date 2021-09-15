require('dotenv').config()

const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET_KEY)
const bcrypt = require('bcrypt')

module.exports = {
  encrypt: (data) => {
    return cryptr.encrypt(data)
  },

  decrypt: (data) => {
    return cryptr.decrypt(data)
  },

  encryptPassword: async (password) => {
    return bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
  },

  checkPassword: async (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash)
  },
}
