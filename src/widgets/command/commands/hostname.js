const os = require('os')

module.exports = {
  name: 'hostname',
  aliases: ['host'],
  ownersOnly: true,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 0,
  disabled: false,
  messageExecute: async (message, args) =>
    message.channel.send(`:partying_face: CaBot is running on ${os.hostname()} (${os.type()} ${os.release()} - ${os.arch()} - ${os.platform()})`)
};
