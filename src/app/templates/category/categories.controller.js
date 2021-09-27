const { createController } = require('awilix-router-core')

const consultControllers = (getCategoriesService) => ({
  getAllCategories: async (req, res, next) => {
    try {
      const result = await getCategoriesService.getCategories(req.query)
      next(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/categories')
  .get('', 'getAllCategories')
