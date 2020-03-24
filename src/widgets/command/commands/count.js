const storage = require('node-persist')
const addPoints = require('../util/addPoints')

module.exports = {
  name: 'count',
  aliases: [],
  ownersOnly: false,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 30,
  disabled: false,
  messageExecute: async (message, args) => {
    if(message.channel.id != '692068931032055840') return

    await storage.init()
    var count = await storage.getItem('counter') + 1

    var emoji = (count == 100) ? ':tada:' : ':money_with_wings:'

    message.channel.send({
      "embed" : {
        "description" : `${emoji} ${count.toString()}`,
        "color": 12745742,
      }
    })

    console.log(count)

    if(count == 100) {
      addPoints(message, 50, message.author.id)
      console.log('awarding for 100')
    }
    else if((count % 10) === 0) {
      addPoints(message, 5, message.author.id)
      console.log('awarding for 10')
    }

    count = (count >= 100) ? 0 : count
    await storage.setItem('counter', count)
  }
};
