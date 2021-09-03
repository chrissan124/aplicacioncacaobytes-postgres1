const Sequilize = require('sequelize')
const dotenv = require('dotenv')
const glob = require('glob')
const { resolve } = require('path')
dotenv.config()

function configDb() {
  try {
    //Create connection pool to db
    const apiDb = new Sequilize(
      process.env.DM_POSTGRES_DB_NAME,
      process.env.DM_POSTGRES_DB_USER,
      process.env.DM_POSTGRES_DB_PASS,
      {
        dialect: 'postgres',
        host: process.env.DM_POSTGRES_DB_HOST,
      }
    )
    //Use global pattern to load all database models automatically
    glob(`${resolve('src')}/**/*.model.js`, function (err, files) {
      if (err) {
        console.log('Error loading .model file', err)
      } else {
        files.forEach(async (file) => {
          const modelFunction = require(file)
          const model = modelFunction(apiDb)
          await model.sync({ alter: true })
        })
      }
    })
    return apiDb
  } catch (error) {
    console.log('Error connecting to database', error)
  }
}
module.exports = configDb()
