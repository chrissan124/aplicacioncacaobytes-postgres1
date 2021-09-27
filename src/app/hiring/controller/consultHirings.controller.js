const { createController } = require('awilix-router-core')

const consultControllers = (getHiringsService) => ({
  getHirings: async (req, res, next) => {
    try {
      const result = await getHiringsService.getHirings(req.query)
      next(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/hirings')
  .get('', 'getHirings')
