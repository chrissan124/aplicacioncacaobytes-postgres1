const { DateTime } = require('luxon')
const { sendEmail } = require('./src/app/common/services/mailer/mailer')

const date = DateTime.fromSeconds(1631920814)
const currrentDate = DateTime.now()
console.log(date.toString() < currrentDate.toString())
console.log(currrentDate.minus({ minutes: 5 }).toString())
/*
  < -> antes
  > -> despues
*/

/* MAILER TEST */

sendEmail('luiscasm2501@gmail.com', 'email', 'template', { name: 'luigi' })
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
