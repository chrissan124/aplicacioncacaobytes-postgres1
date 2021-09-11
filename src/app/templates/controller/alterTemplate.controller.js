const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')
const UpdateError = require('../../common/controllers/error-handling/updateError')

const alterControllers = (updateTemplateService, removeTemplateService) => ({
  updateTemplate: async (req, res, next) => {
    try {
      const paramId = req.params.id
      const bodyId = req.body.templateId
      if (paramId === bodyId) {
        const result = await updateTemplateService.updateTemplate(req.body)
        res.send(result)
      } else {
        next(new UpdateError(paramId, bodyId))
      }
    } catch (error) {
      next(error)
    }
  },
  removeTemplate: async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await removeTemplateService.removeTemplate(id)
      if (result) {
        res.send(`Template ${id} succesfully deleted`)
      } else {
        next(new NotFoundError(`Contract template ${id}`))
      }
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(alterControllers)
  .prefix('/api/contract-templates/:id')
  .put('', 'updateTemplate')
  .delete('', 'removeTemplate')
