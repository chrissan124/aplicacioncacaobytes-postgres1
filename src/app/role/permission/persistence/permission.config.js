const logger = require('../../../common/controllers/logger/logger')

const actions = ['C', 'R', 'U', 'D']
const excludedEntities = ['RolePermission', 'ClientProduct']

const specialEntities = {
  Status: ['R'],
  Category: ['R'],
  Permission: ['R'],
}

/*
  Automatically setup permissions, it checks the database first to avoid inserting preexisting permissions 
*/

function filterPermission(permission = { type, name }, permissionList = []) {
  return permissionList.find((value) => {
    return value.type === permission.type && value.name === permission.name
  })
}

async function setPermissions(apiDb, PermissionModel) {
  try {
    const existentPermissions = await PermissionModel.findAll({
      attributes: ['name', 'type'],
      raw: true,
    })
    const insertPermissions = []
    const baseEntities = Object.keys(apiDb.models)
    baseEntities.forEach((entity) => {
      if (!excludedEntities.includes(entity)) {
        const validActions = specialEntities[entity] || actions
        validActions.forEach((action) => {
          const perm = { name: entity, type: action }
          if (!filterPermission(perm, existentPermissions)) {
            insertPermissions.push(perm)
          }
        })
      }
    })
    insertPermissions.length &&
      (await PermissionModel.bulkCreate(insertPermissions))
    return insertPermissions
  } catch (error) {
    logger.error(`Error at setting up permissions [${error.message}]`)
  }
}

module.exports = setPermissions
