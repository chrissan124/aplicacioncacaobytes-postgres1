const { glob } = require('glob')
const logger = require('../../controllers/logger/logger')
const { resolve } = require('path')
require('dotenv').config()
async function configNosqlDb(attempts = 1) {
  if (attempts > 3) return
  try {
    const mongoose = require('mongoose')
    const nosqlDb = await mongoose.connect(process.env.NOSQL_DB_URI)

    nosqlDb.set('autoCreate', process.env.NOSQL_AUTO_CREATE === 'true')

    const files = glob.sync(`${resolve('src')}/**/*.schema.js`)
    files.forEach((file) => {
      const schemaFunction = require(file)
      const schema = schemaFunction(mongoose.Schema)
      const model = nosqlDb.model(schema.name, schema.schema)
    })
    return nosqlDb
  } catch (error) {
    logger.error(
      `Error connecting to mongo DB (attemp #${attempts}) [${error.message}]`
    )
    attempts += 1
    configNosqlDb(attempts)
  }
}

module.exports = configNosqlDb
