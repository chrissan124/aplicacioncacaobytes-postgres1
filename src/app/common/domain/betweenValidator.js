function stringBetween(arg, floor = 0, ceil = Infinity, kind = 'value') {
  if (arg) {
    const checked = typeof arg === 'string' ? arg.trim() : String(arg);
    if (checked.length >= floor && checked.length <= ceil) {
      return checked;
    }
  }
  throw new Error(
    `Validation error: ${kind} "${arg}" must be between ${floor} and ${ceil} characters long`
  );
}

function numberBetween(arg, floor = 0, ceil = Infinity, kind = 'value') {
  if (arg) {
    if (arg >= floor && arg <= ceil) {
      return true;
    }
  }
  throw new Error(
    `Validation error: ${kind} "${arg}" must be between ${floor} and ${ceil}`
  );
}

module.exports = {
  stringBetween,
  numberBetween,
};
