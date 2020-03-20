const storage = require('node-persist')

module.exports = {
  name: 'count',
  aliases: [],
  ownersOnly: true,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 0,
  disabled: false,
  messageExecute: async (message, args) => {
    storage.init()
    var count = await storage.getItem('counter') + 1

    if(count == 100) {
      // do cool things
      var emoji = ':tada:'
      count = 1
    }
    else {
      var emoji = ':money_with_wings:'
    }

    message.channel.send(`${emoji} ${count.toString()}`)
    await storage.setItem('counter', count)
  }
};
