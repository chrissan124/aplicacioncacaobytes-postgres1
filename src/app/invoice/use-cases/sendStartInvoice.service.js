const { sendEmail } = require('../../common/services/mailer/mailer')
const mapInvoiceInfo = require('../domain/mapInvoiceInfo')

class sendStartInvoiceService {
  constructor(clientProductRepository) {
    this.clientProductRepository = clientProductRepository
  }
  async sendStartInvoice(invoice, overdue = false) {
    let clientProduct = await this.clientProductRepository.getAll({
      clientProductId: invoice.Contract?.clientProductFk,
      include: ['Client', 'Product'],
    })
    clientProduct = clientProduct[0]
    if (clientProduct) {
      const mappedInfo = mapInvoiceInfo(invoice, clientProduct)
      if (overdue) {
        return await sendEmail(
          mappedInfo.client.email,
          `Reminder: invoice for ${mappedInfo.product.name}`,
          'overdueInvoice',
          mappedInfo
        )
      }
      return await sendEmail(
        mappedInfo.client.email,
        `Invoice for ${mappedInfo.product.name} - ${mappedInfo.startDate}`,
        'startInvoice',
        mappedInfo
      )
    }
  }
}
module.exports = sendStartInvoiceService
