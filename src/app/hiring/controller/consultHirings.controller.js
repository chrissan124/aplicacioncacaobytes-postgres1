const { createController } = require('awilix-router-core')
const paginateResponse = require('../../common/controllers/pagination/paginateResponse')

const consultControllers = (getHiringsService) => ({
  getHirings: async (req, res, next) => {
    try {
      const result = await getHiringsService.getHirings(req.query)
      paginateResponse(req, res, result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/hirings')
  .get('', 'getHirings')
