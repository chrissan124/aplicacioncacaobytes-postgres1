const { DataTypes } = require('sequelize')

module.exports = function makeModel(apiDb) {
  const Permission = apiDb.define(
    'Permission',
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING(1),
        allowNull: false,
      },
      permissionId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      timestamps: false,
    }
  )
  return Permission
}
