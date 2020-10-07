const storage = require('node-persist')

module.exports = {
  name: 'setcount',
  aliases: [],
  ownersOnly: true,
  guildOnly: false,
  requireArgs: true,
  deleteCommand: false,
  cooldown: 0,
  disabled: false,
  messageExecute: async (message, args) => {
    var num = Number(args[0])
    await storage.init()
    await storage.setItem('counter', num)
    await message.channel.send({
      "embed" : {
        "description" : `:wrench: counter set to ${num}`,
        "color": 12745742,
      }
    })
  }
};
