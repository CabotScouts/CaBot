const setPoints = require('../util/setPoints')

module.exports = {
  name: 'setpoint',
  aliases: ['sp'],
  ownersOnly: false,
  guildOnly: false,
  requireArgs: true,
  deleteCommand: false,
  cooldown: 0,
  disabled: false,
  messageExecute: async (message, args) => {
    if(!(message.member.roles.cache.find(r => r.name === 'leader') || message.member.roles.cache.find(r => r.name === 'bot'))) return
    
    if(args.length > 0 && args[0].substring(0, 2) != '<@') {
      points = Number(args[0])
      setPoints(message, points)
    }
  }
};
