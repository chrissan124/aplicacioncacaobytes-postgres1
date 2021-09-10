const { DataTypes } = require('sequelize')
const logger = require('../../common/controllers/logger/logger')
const categories = require('./categories')
//PENDING: add status FK

function makeModel(apiDb) {
  const Category = apiDb.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        //unique: true,
      },
      categoryId: {
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
  Category.sync()
    .then(async () => {
      const statusCount = await Category.count()
      const categoryNames = Object.keys(categories)
      if (statusCount < categoryNames.length) {
        Object.keys(categories).forEach((key) => {
          Category.create({ name: key }).catch((err) =>
            logger.error(`${key} category already exists`)
          )
        })
      }
    })
    .catch((err) => logger.error(err.message))
  return Category
}

module.exports = makeModel
