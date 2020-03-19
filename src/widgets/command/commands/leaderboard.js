module.exports = {
  name: 'leaderboard',
  aliases: [],
  ownersOnly: false,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 10,
  disabled: false,
  messageExecute: async (message, args) =>
    message.channel.send(`*Nobody has any points yet!*`)
};
