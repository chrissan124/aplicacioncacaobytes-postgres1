const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const UpdateError = require('../../common/controllers/error-handling/updateError')

const alterControllers = (updateEmployeeService, removeEmployeeService) => ({
  updateEmployee: async (req, res, next) => {
    try {
      const paramId = req.params.id
      const bodyId = req.body.employeeId
      if (paramId === bodyId) {
        const result = await updateEmployeeService.updateEmployee(req.body)
        res.send(result)
      } else {
        next(new UpdateError(paramId, bodyId))
      }
    } catch (error) {
      next(error)
    }
  },
  removeEmployee: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await removeEmployeeService.removeEmployee(id)
      if (result) {
        res.send(`Employee ${id} succesfully marked as deleted`)
      } else {
        next(new NotFoundError(`Employee ${id}`))
      }
    } catch (error) {
      next(error)
    }
  },
  restoreEmployee: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await removeEmployeeService.restoreEmployee(id)
      if (result) {
        res.send(`Employee ${id} succesfully restored`)
      } else {
        next(new NotFoundError(`Employee ${id}`))
      }
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(alterControllers)
  .prefix('/employees/:id')
  .put('', 'updateEmployee')
  .delete('', 'removeEmployee')
  .patch('', 'restoreEmployee')
