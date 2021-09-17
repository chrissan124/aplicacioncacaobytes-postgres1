function prepareConditions(conditions) {
  for (let [key, value] of Object.entries(conditions)) {
    if (typeof value === 'object' && !Array.isArray(value)) {
      Object.keys(value).forEach((valueKey) => {
        const keyValue = value[valueKey]
        delete value[valueKey]
        value[`$${valueKey}`] = keyValue
      })
    }
    conditions[key] = value
  }
  return conditions
}
module.exports = prepareConditions
