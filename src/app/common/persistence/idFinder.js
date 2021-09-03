function findId(model) {
  console.log('model', model)
  return Object.keys(model).find((value) => {
    return value.endsWith('Id')
  })
}

module.exports = findId
