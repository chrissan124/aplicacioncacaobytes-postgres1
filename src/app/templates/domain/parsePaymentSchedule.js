function parseScheduleType(scheduleType) {
  switch (scheduleType) {
    case 'D':
      return 'days'
    case 'M':
      return 'months'
    case 'W':
      return 'weeks'
    case 'Y':
      return 'years'
    default:
      return 'months'
  }
}
module.exports = parseScheduleType
