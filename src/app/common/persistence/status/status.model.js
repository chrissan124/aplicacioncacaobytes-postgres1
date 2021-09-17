const { DataTypes } = require('sequelize')
const logger = require('../../controllers/logger/logger')
const statuses = require('./statuses')

function makeModel(apiDb) {
  const Status = apiDb.define(
    'Status',
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      statusId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      timestamps: false,
      indexes: [{ unique: true, fields: ['name'] }],
    }
  )
  Status.sync()
    .then(async () => {
      const statusCount = await Status.count()
      const statusNames = Object.keys(statuses)
      if (statusCount < statusNames.length) {
        statusNames.forEach((key) => {
          Status.create({ name: key }).catch(() =>
            logger.error(`${key} status already exists`)
          )
        })
      }
    })
    .catch((err) => logger.error(err))
  return Status
}

module.exports = makeModel
