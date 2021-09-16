const { createController } = require('awilix-router-core')

const paginateResponse = require('../../../common/controllers/pagination/paginateResponse')

const consultControllers = (getPermissionsService) => ({
  getPerms: async (req, res, next) => {
    try {
      const result = await getPermissionsService.getPermissions(req.query)
      paginateResponse(req, res, result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/api/perms')
  .get('', 'getPerms')
