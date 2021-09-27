const { createController } = require('awilix-router-core')
const NotFoundError = require('../../common/controllers/error-handling/NotFoundError')

const consultControllers = (getFileTemplatesService) => ({
  getTemplates: async (req, res, next) => {
    try {
      const result = await getFileTemplatesService.getFileTemplates(req.query)
      next(result)
    } catch (error) {
      next(error)
    }
  },
  getTemplateFile: async (req, res, next) => {
    try {
      const id = req.params.id
      const file = await getFileTemplatesService.getFileTemplate(id)
      if (file) {
        res.send(file)
      } else throw new NotFoundError(`file ${id}`)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(consultControllers)
  .prefix('/templates')
  .get('', 'getTemplates')
  .get('/:id', 'getTemplateFile')
