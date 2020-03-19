var { incrementCount, getCount } = require('../caches/countCache')

module.exports = {
  name: 'count',
  aliases: [],
  ownersOnly: false,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 60,
  disabled: false,
  messageExecute: async (message, args) => {
    message.channel.send(`:money_with_wings: ${getCount()}`)
    incrementCount()
  }
};
