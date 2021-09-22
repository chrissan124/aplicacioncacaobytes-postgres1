const { createController } = require('awilix-router-core')
const upload = require('../config/files.config')

const registerControllers = (uploadTemplateService) => ({
  uploadTemplate: async (req, res, next) => {
    try {
      const result = await uploadTemplateService.uploadTemplate({
        ...req.body,
        ...req.file,
      })
      res.send(result)
    } catch (error) {
      next(error)
    }
  },
  updateTemplate: async (req, res, next) => {
    try {
    } catch (error) {
      next(error)
    }
  },
})

module.exports = createController(registerControllers)
  .prefix('/templates')
  .post('/upload', 'uploadTemplate')
  .before(upload.single('template'))
