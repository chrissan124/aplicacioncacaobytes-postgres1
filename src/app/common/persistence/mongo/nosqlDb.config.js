const { glob } = require('glob')
const logger = require('../../controllers/logger/logger')
const { resolve } = require('path')
require('dotenv').config()
async function configNosqlDb() {
  try {
    const mongoose = require('mongoose')
    const nosqlDb = await mongoose.connect(process.env.NOSQL_DB_URI)

    const files = glob.sync(`${resolve('src')}/**/*.schema.js`)
    files.forEach((file) => {
      const schemaFunction = require(file)
      const schema = schemaFunction(mongoose.Schema)
      const model = nosqlDb.model(schema.name, schema.schema)
    })
    return nosqlDb
  } catch (error) {
    logger.error(`Error connecting to mongo DB [${error.message}]`)
  }
}

module.exports = configNosqlDb
