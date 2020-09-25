const toggleRole = require("../util/toggleRole")

module.exports = {
  name: 'programmer',
  aliases: [],
  ownersOnly: false,
  guildOnly: true,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 0,
  disabled: false,
  messageExecute: async (message, args) => {
    toggleRole(message, "702163719269908603")
  }
};
