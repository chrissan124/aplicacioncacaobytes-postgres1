module.exports = function getMaxDeadline(type, dateTime) {
  switch (type) {
    case 'W':
      return 7
    case 'D':
      return 1
    case 'Y':
      return dateTime.daysInYear
    default:
      return dateTime.daysInMonth
  }
}
