const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const paginateRequest = require('../../common/controllers/pagination/paginateRequest')
const paginateResponse = require('../../common/controllers/pagination/paginateResponse')

const consultControllers = (getClientsService, getClientService) => ({
  getAllClients: async (req, res, next) => {
    try {
      const paging = paginateRequest(req)
      const result = await getClientsService.getClients(paging)
      paginateResponse(req, res, result)
    } catch (error) {
      next(error)
    }
  },
  getClient: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await getClientService.getClient(id)
      if (result) res.send(result)
      else next(new NotFoundError(`Client ${id}`))
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/api/clients')
  .get('', 'getAllClients')
  .get('/:id', 'getClient')
