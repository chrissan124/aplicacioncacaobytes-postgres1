const { createController } = require('awilix-router-core')
const paginateRequest = require('../../common/controllers/pagination/paginateRequest')
const paginateResponse = require('../../common/controllers/pagination/paginateResponse')

const consultControllers = (getCategoriesService, getClientService) => ({
  getAllCategories: async (req, res, next) => {
    try {
      const options = paginateRequest(req)
      const result = await getCategoriesService.getCategories(options)
      paginateResponse(req, res, result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/api/templates/categories')
  .get('', 'getAllCategories')
