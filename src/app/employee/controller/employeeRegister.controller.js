const { createController } = require('awilix-router-core')

const registerControllers = (registerEmployeeService) => ({
  registerEmployee: async (req, res, next) => {
    try {
      const result = await registerEmployeeService.registerEmployee(req.body)
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(registerControllers)
  .prefix('/api/employees')
  .post('', 'registerEmployee')
