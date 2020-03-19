const exclude = [ 'system', 'verify', 'info' ]

module.exports = {
  name: 'announce',
  aliases: ['a'],
  ownersOnly: true,
  guildOnly: true,
  requireArgs: true,
  deleteCommand: false,
  cooldown: 0,
  disabled: false,
  messageExecute: async (message, args) => {
    // post a message in every channel (besides those excluded)
  }
};
