function findAssociations(model, associationNames = []) {
  const associations = []
  if (model) {
    associationNames.forEach((name) => {
      const assoc = model.associations[name]
      if (assoc) associations.push(assoc)
    })
  }
  return associations
}
module.exports = findAssociations
