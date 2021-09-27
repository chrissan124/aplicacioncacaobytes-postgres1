const { createController } = require('awilix-router-core')

const registerControllers = (
  createHiringService,
  getHiringsService,
  updateHiringService
) => ({
  createHiring: async (req, res, next) => {
    try {
      const result = await createHiringService.createHiring(
        req.body,
        req.params.id
      )
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
  getHirings: async (req, res, next) => {
    try {
      const result = await getHiringsService.getHiringsByEmployee(
        req.params.id,
        req.query
      )
      next(result)
    } catch (error) {
      next(error)
    }
  },
  updateHiring: async (req, res, next) => {
    try {
      const paramId = req.params.hiringId
      const bodyId = req.body.hiringId
      if (paramId === bodyId) {
        const result = await updateHiringService.updateHiring(req.body)
        res.send(result)
      } else {
        next(new UpdateError(paramId, bodyId))
      }
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(registerControllers)
  .prefix('/employees/:id/hirings')
  .post('', 'createHiring')
  .get('', 'getHirings')
  .put('/:hiringId', 'updateHiring')
