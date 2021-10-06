const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')

const consultControllers = (getUsersService, checkNewUserService) => ({
  getUsers: async (req, res, next) => {
    try {
      const result = await getUsersService.getUsers(req.query)
      next(result)
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
  checkNewUser: async (req, res, next) => {
    try {
      const result = await checkNewUserService.checkNewUser(req.params.email)
      res.send({ repeat: result })
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/users')
  .get('', 'getUsers')
  .get('/:id', 'getUser')
  .get('/email/:email', 'checkNewUser')
