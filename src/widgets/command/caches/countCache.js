var count = 0

module.exports = {
  incrementCount : () => {
    count = count + 1
  },

  getCount :  () => {
    return count
  }
}
