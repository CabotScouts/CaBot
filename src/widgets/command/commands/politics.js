const toggleRole = require("../util/toggleRole")

module.exports = {
  name: 'politics',
  aliases: [],
  ownersOnly: false,
  guildOnly: true,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 0,
  disabled: false,
  messageExecute: async (message, args) => {
    toggleRole(message, "715697602087354389")
  }
};
