const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const UpdateError = require('../../common/controllers/error-handling/updateError')

const alterControllers = (updateClientService, removeClientService) => ({
  updateClient: async (req, res, next) => {
    try {
      const paramId = req.params.id
      const bodyId = req.body.clientId
      if (paramId === bodyId) {
        const result = await updateClientService.updateClient(req.body)
        res.send(result)
      } else {
        next(new UpdateError(paramId, bodyId))
      }
    } catch (error) {
      next(error)
    }
  },
  removeClient: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await removeClientService.removeClient(id)
      if (result) {
        res.send(`Client ${id} succesfully marked as deleted`)
      } else {
        next(new NotFoundError(`Client ${id} not found`))
      }
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(alterControllers)
  .prefix('/api/clients')
  .put('/:id', 'updateClient')
