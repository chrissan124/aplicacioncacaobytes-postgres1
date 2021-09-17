const { DateTime } = require('luxon')

const date = DateTime.fromSeconds(1631920814)
const currrentDate = DateTime.now()
console.log(date.toString() < currrentDate.toString())
console.log(currrentDate.minus({ minutes: 5 }).toString())
/*
  < -> antes
  > -> despues
*/
