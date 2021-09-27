const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')

const consultControllers = (getEmployeesService) => ({
  getEmployees: async (req, res, next) => {
    try {
      const result = await getEmployeesService.getEmployees(req.query)
      next(result)
    } catch (error) {
      next(error)
    }
  },
  getEmployee: async (req, res, next) => {
    try {
      const result = await getEmployeesService.getEmployee(req.params.id)
      if (result) res.send(result)
      else next(new NotFoundError(`employee ${req.params.id}`))
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/employees')
  .get('', 'getEmployees')
  .get('/:id', 'getEmployee')
