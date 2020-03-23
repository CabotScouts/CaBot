const storage = require('node-persist')

module.exports = {
  name: 'clearpoints2',
  aliases: [],
  ownersOnly: true,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 0,
  disabled: false,
  messageExecute: async (message, args) => {
    await storage.init()
    await storage.setItem('leaderboard', [])
    await message.channel.send({
      "embed" : {
        "description" : "Points cleared :exploding_head:",
        "color": 15105570,
      }
    })
  }
};
