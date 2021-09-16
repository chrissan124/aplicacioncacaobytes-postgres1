const { DataTypes } = require('sequelize')

module.exports = function makeModel(apiDb) {
  const Role = apiDb.define(
    'Role',
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        //unique: true,
      },
      description: {
        type: DataTypes.STRING(200),
      },
      deletable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      indexes: [{ unique: true, fields: ['name'] }],
    }
  )
  return Role
}
