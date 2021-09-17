function makeSchema(Schema) {
  const tokenSchema = new Schema({
    token: {
      type: String,
      required: true,
    },
    expiration_date: {
      type: Date,
      required: true,
    },
  })
  return {
    name: 'tokens',
    schema: tokenSchema,
  }
}
module.exports = makeSchema
