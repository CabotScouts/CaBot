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
  messageExecute: async (message, args) => {
    message.channel.send({
      "embed": {
        "title": "Hello, I'm CaBot <:scout:693531748696326245>",
        "description" : "Here are some things I can do:",
        "color": 16580705,

        "fields": [
          {
            "name": "!info",
            "value": "shows this help message"
          },
          {
            "name": "!topic <topic>",
            "value": "makes a new discussion topic"
          },
          {
            "name": "!joke",
            "value": "posts a (very bad) dad joke"
          },
          {
            "name": "!count",
            "value": "does something weird with numbers"
          },
          {
            "name": "!leaderboard [all]",
            "value": "where do you rank?"
          },
          {
            "name": "!gamer",
            "value": "add yourself to the game role"
          },
          {
            "name": "!programmer",
            "value": "add yourself to the programming role"
          },
          {
            "name": "!lgbt",
            "value": "add yourself to the lgbt role"
          },
          {
            "name": "!politics",
            "value": "add yourself to the politics role"
          },
        ]
      }
    })
  }
    // TODO: if in #leaders send leader commands too
};
