const addPoints = require('../util/addPoints')

module.exports = {
  name: 'depoint',
  aliases: [],
  ownersOnly: false,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 0,
  disabled: false,
  messageExecute: async (message, args) => {
    if(!(message.member.roles.cache.find(r => r.name === 'leader') || message.member.roles.cache.find(r => r.name === 'bot'))) return
    
    var points = 1
    if(args.length > 0 && args[0].substring(0, 2) != '<@') points = Number(args[0])
    addPoints(message, -points)
  }
};
