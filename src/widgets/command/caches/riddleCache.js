var answers = new Map()

module.exports = {
  storeAnswer : (channel, answer) => {
    answers.set(channel, answer)
  },

  hasAnswer : (channel) => {
    return answers.has(channel)
  },

  getAnswer : (channel) => {
    if(answers.contains(channel)) {
      var answer = answers.get(channel)
      answers.delete(channel)
      return answer
    }
  }
}
