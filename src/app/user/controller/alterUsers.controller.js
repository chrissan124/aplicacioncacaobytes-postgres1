const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const UpdateError = require('../../common/controllers/error-handling/updateError')

const alterControllers = (updateUserService, deleteUserService) => ({
  updateUser: async (req, res, next) => {
    try {
      const paramId = req.params.id
      const bodyId = req.body.userId
      if (paramId === bodyId) {
        const result = await updateUserService.updateUser(req.body)
        res.send(result)
      } else {
        next(new UpdateError(paramId, bodyId))
      }
    } catch (error) {
      next(error)
    }
  },
  removeUser: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await deleteUserService.deleteUser(id)
      if (result) {
        res.send(`User ${id} succesfully marked as deleted`)
      } else {
        next(new NotFoundError(`User ${id}`))
      }
    } catch (error) {
      next(error)
    }
  },
  restoreUser: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await deleteUserService.restoreUser(id)
      if (result) {
        res.send(`User ${id} succesfully restored`)
      } else {
        next(new NotFoundError(`User ${id}`))
      }
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(alterControllers)
  .prefix('/users/:id')
  .put('', 'updateUser')
  .delete('', 'removeUser')
  .patch('', 'restoreUser')
