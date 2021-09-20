const { DataTypes } = require('sequelize')

module.exports = function makeModel(apiDb) {
  const FileTemplate = apiDb.define('FileTemplate', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(200),
    },
    fileTemplateId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  })
  return FileTemplate
}
