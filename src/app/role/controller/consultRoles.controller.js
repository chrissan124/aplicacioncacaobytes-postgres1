const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const paginateResponse = require('../../common/controllers/pagination/paginateResponse')

const consultControllers = (getRolesService) => ({
  getRolesPermissions: async (req, res, next) => {
    try {
      const result = await getRolesService.getRolesPermissions(req.query)
      paginateResponse(req, res, result)
    } catch (error) {
      next(error)
    }
  },
  getRoles: async (req, res, next) => {
    try {
      const result = await getRolesService.getRoles(req.query)
      paginateResponse(req, res, result)
    } catch (error) {
      next(error)
    }
  },
  getRole: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await getRolesService.getRole(id)
      if (result) res.send(result)
      else next(NotFoundError(`role ${id}`))
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/roles')
  .get('', 'getRoles')
  .get('/perms', 'getRolesPermissions')
  .get('/:id', 'getRole')
