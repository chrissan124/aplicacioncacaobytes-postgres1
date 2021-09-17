const { createController } = require('awilix-router-core')

const registerControllers = (
  createRoleService,
  updateRoleService,
  deleteRoleService
) => ({
  createRole: async (req, res, next) => {
    try {
      const result = await createRoleService.createRole(req.body)
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
  updateRole: async (req, res, next) => {
    try {
      const result = await updateRoleService.updateRole(req.body)
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
  deleteRole: async (req, res, next) => {
    try {
      const result = await deleteRoleService.deleteRole(req.params.id)
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(registerControllers)
  .prefix('/roles')
  .post('', 'createRole')
  .put('/:id', 'updateRole')
  .delete('/:id', 'deleteRole')
