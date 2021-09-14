const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const paginateResponse = require('../../common/controllers/pagination/paginateResponse')

const consultControllers = (getUsersService) => ({
  getUsers: async (req, res, next) => {
    try {
      const result = await getUsersService.getUsers(req.query)
      paginateResponse(req, res, result)
    } catch (error) {
      next(error)
    }
  },
  getUser: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await getUsersService.getUser(id)
      if (result) res.send(result)
      else next(NotFoundError(`user ${id}`))
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/api/users')
  .get('', 'getUsers')
  .get('/:id', 'getUser')
