const { DataTypes } = require('sequelize')

module.exports = function makeModel(apiDb) {
  const ContractTemplate = apiDb.define('ContractTemplate', {
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    specificPayments: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    scheduleType: {
      type: DataTypes.STRING(1),
      defaultValue: 'M',
    },
    paymentSchedule: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    description: {
      type: DataTypes.STRING(200),
    },
    templateId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
  })
  return ContractTemplate
}
