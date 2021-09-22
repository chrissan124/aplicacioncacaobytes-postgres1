const { DateTime } = require('luxon')

const mapInvoiceInfo = (invoice, clientProduct = { Client, Product }) => {
  return {
    client: {
      name: clientProduct.Client.name,
      email: clientProduct.Client.email,
    },
    product: {
      name: clientProduct.Product.name,
    },
    amount: invoice.amount,
    startDate: DateTime.fromSQL(invoice.startDate).toLocaleString(),
    deadline: DateTime.fromSQL(invoice.deadline).toLocaleString(),
    url: `www.app/client/${invoice.invoiceId}/token`,
  }
}
module.exports = mapInvoiceInfo
