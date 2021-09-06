function findId(model) {
  return Object.keys(model).find((value) => {
    return value.endsWith('Id')
  })
}

module.exports = findId
