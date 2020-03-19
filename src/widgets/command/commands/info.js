const { prefixes } = require('../config');

module.exports = {
  name: 'info',
  aliases: ['commands', 'help', 'i'],
  ownersOnly: false,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 10,
  disabled: false,
  messageExecute: async (message, args) =>
    message.channel.send(`:fleur_de_lis: Hello, I'm CaBot, here are some things I can do :fleur_de_lis:\n
**${prefixes[0]}info** - show this help message
**${prefixes[0]}topic <topic>** - make a new chat topic
**${prefixes[0]}count** - something weird with numbers :man_shrugging:
**${prefixes[0]}joke** - show a joke
**${prefixes[0]}leaderboard** - show the current leaderboard`)

  //**${prefixes[0]}riddle** - posts a riddle (**${prefixes[0]}answer** for the answer)
    // TODO: if in #leaders send leader commands too
};
