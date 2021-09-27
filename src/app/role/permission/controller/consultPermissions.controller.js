const { createController } = require('awilix-router-core')

const consultControllers = (getPermissionsService) => ({
  getPerms: async (req, res, next) => {
    try {
      const result = await getPermissionsService.getPermissions(req.query)
      next(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/perms')
  .get('', 'getPerms')
