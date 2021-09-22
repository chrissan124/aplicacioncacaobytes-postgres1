const { createController } = require('awilix-router-core')

const registerControllers = (createTemplateService) => ({
  createTemplate: async (req, res, next) => {
    try {
      const result = await createTemplateService.createTemplate(req.body)
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(registerControllers)
  .prefix('/contract-templates')
  .post('', 'createTemplate')
