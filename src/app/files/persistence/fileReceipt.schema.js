function makeSchema(Schema) {
  const fileSchema = new Schema({
    _id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    upload_date: {
      type: Date,
      required: true,
    },
  })
  return {
    name: 'file_receipts',
    schema: fileSchema,
  }
}
module.exports = makeSchema
