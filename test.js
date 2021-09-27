const { DateTime } = require('luxon')

const date = DateTime.fromSeconds(1631920814)
const currrentDate = DateTime.now()
console.log(date.toString() < currrentDate.toString())
console.log(currrentDate.minus({ minutes: 5 }).toString())
/*
  < -> antes
  > -> despues
*/

/* MAILER TEST */
try {
  const thing = '2021-09-10T22:19:29.815Z'
  const badDate = DateTime.fromISO(thing)
  console.log('valid', badDate.toLocaleString())
} catch (error) {
  console.log('whoooops', error.message)
}
