const { createController } = require('awilix-router-core')
const paginateResponse = require('../../common/controllers/pagination/paginateResponse')
const UpdateError = require('../../common/controllers/error-handling/updateError')
const consultControllers = (
  getContractsService,
  updateContractService,
  startContractService,
  cancelContractService
) => ({
  getAllContracts: async (req, res, next) => {
    try {
      const result = await getContractsService.getAllContracts(req.query)
      paginateResponse(req, res, result)
    } catch (error) {
      next(error)
    }
  },
  getContractById: async (req, res, next) => {
    try {
      const { id } = req.params
      const result = await getContractsService.getContract(id, req.query)
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
  updateContract: async (req, res, next) => {
    try {
      const paramId = req.params.id
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
  cancelContract: async (req, res, next) => {
    try {
      const paramId = req.params.id
      const result = await cancelContractService.cancelContract(paramId)
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/contracts')
  .get('', 'getAllContracts')
  .get('/:id', 'getContractById')
  .put('/:id', 'updateContract')
  .put('/:id/started', 'startContract')
  .put('/:id/canceled', 'cancelContract')
