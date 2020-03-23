const storage = require('node-persist')
const addPoints = require('../util/addPoints')

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
    await storage.init()
    var count = await storage.getItem('counter') + 1

    console.log(count)

    if(count == 100) {
      addPoints(message, 50, message.author.id)
      var emoji = ':tada:'
    }
    else {
      var emoji = ':money_with_wings:'
    }

    message.channel.send({
      "embed" : {
        "description" : `${emoji} ${count.toString()}`,
        "color": 12745742,
      }
    })

    count = (count >= 100) ? 0 : count
    await storage.setItem('counter', count)
  }
};
