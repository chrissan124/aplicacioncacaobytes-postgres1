const { Op } = require('sequelize')
const logger = require('../../../common/controllers/logger/logger')

async function setRoles(apiDb) {
  try {
    await setMaster(apiDb)
  } catch (error) {
    logger.error(`error at setting roles [${error.message}]`)
  }
}

async function setMaster(apiDb) {
  const { Role, Permission } = apiDb.models
  const [role, justCreated] = await Role.findOrCreate({
    where: {
      name: 'master',
      deletable: false,
      description: 'role with all permissions granted',
    },
  })

  let rolePermissions = await role.getPermissions({
    attributes: ['permissionId'],
    raw: true,
  })
  rolePermissions = rolePermissions.map((rolePerm) => {
    return rolePerm.permissionId
  })
  const perms = await Permission.findAll({
    attributes: ['permissionId'],
    where: {
      permissionId: {
        [Op.notIn]: rolePermissions,
      },
    },
  })
  perms.length && (await role.addPermissions(perms))
}

module.exports = setRoles
