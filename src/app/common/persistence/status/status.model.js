const { DataTypes } = require('sequelize')
const logger = require('../../controllers/logger/logger')
const statuses = require('./statuses')
//PENDING: add status FK

function makeModel(apiDb) {
  const Status = apiDb.define(
    'Status',
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        //unique: true,
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
      if (statusCount === 0) {
        const records = []
        Object.keys(statuses).forEach((key) => {
          records.push({ name: key })
        })
        Status.bulkCreate(records).catch((err) => logger.log(err))
      }
    })
    .catch((err) => logger.log(err))
  return Status
}

module.exports = makeModel
