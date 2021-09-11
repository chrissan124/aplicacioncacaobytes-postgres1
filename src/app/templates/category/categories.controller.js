const { createController } = require('awilix-router-core')
const paginateResponse = require('../../common/controllers/pagination/paginateResponse')

const consultControllers = (getCategoriesService) => ({
  getAllCategories: async (req, res, next) => {
    try {
      const result = await getCategoriesService.getCategories(req.query)
      paginateResponse(req, res, result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/api/templates/categories')
  .get('', 'getAllCategories')
