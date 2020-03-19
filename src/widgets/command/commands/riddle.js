const { storeAnswer, hasAnswer } = require('../caches/riddleCache')
const axios = require('axios')
const api = "";

module.exports = {
  name: 'riddle',
  aliases: [],
  ownersOnly: false,
  guildOnly: true,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 10,
  disabled: false,
  messageExecute: async (message, args) => {
    if(hasAnswer(channel)) {
      message.channel.send(`You've already had a riddle - use !answer to check your answer before requesting another`)
    }
    else {
      axios.get(api, { headers: { "Accept": "application/json" } }).then(response => {
        storeAnswer(channel, response.data.answer)
        message.channel.send(`*${response.data.riddle}*`)
      })
    }
  }
};
