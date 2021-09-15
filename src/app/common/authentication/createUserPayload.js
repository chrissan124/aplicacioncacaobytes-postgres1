function createUserPayload({ userId, roleFk }) {
  return {
    user: userId,
    role: roleFk,
  }
}
module.exports = createUserPayload
