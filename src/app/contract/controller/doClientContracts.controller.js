const { createController } = require('awilix-router-core')
const UpdateError = require('../../common/controllers/error-handling/updateError')
const paginateResponse = require('../../common/controllers/pagination/paginateResponse')

const consultControllers = (
  getContractsService,
  updateContractService,
  startContractService
) => ({
  getContractsByClient: async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await getContractsService.getContractsByClient(
        id,
        req.query
      )
      paginateResponse(req, res, result)
    } catch (error) {
      next(error)
    }
  },
  getContractById: async (req, res, next) => {
    try {
      const { contractId } = req.params
      const result = await getContractsService.getContract(
        contractId,
        req.query
      )
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
  updateContract: async (req, res, next) => {
    try {
      const paramId = req.params.contractId
      const bodyId = req.body.contractId
      if (paramId === bodyId) {
        const result = await updateContractService.updateContract(req.body)
        res.send(result)
      } else {
        next(new UpdateError(paramId, bodyId))
      }
    } catch (error) {
      next(error)
    }
  },
  startContract: async (req, res, next) => {
    try {
      const paramId = req.params.contractId
      const bodyId = req.body.contractId
      if (paramId === bodyId) {
        const result = await startContractService.startContract(req.body)
        res.send(result)
      } else {
        next(new UpdateError(paramId, bodyId))
      }
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/api/clients/:id/contracts')
  .get('', 'getContractsByClient')
  .get('/:contractId', 'getContractById')
  .put('/:contractId', 'updateContract')
  .put('/:contractId/started', 'startContract')
