const toggleRole = require("../util/toggleRole")

module.exports = {
  name: 'gamer',
  aliases: [],
  ownersOnly: false,
  guildOnly: true,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 0,
  disabled: false,
  messageExecute: async (message, args) => {
    toggleRole(message, "699660460546588812")
  }
};
