const toggleRole = require("../util/toggleRole")

module.exports = {
  name: 'lgbt',
  aliases: [],
  ownersOnly: false,
  guildOnly: true,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 0,
  disabled: false,
  messageExecute: async (message, args) => {
    toggleRole(message, "715693259497930804")
  }
};
