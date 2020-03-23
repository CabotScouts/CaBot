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
    if(args.length > 0 && args[0].substring(0, 2) != '<@') {
      points = Number(args[0])
      setPoints(message, points)
    }
  }
};
