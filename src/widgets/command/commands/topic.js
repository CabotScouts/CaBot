module.exports = {
  name: 'topic',
  aliases: ['t'],
  ownersOnly: false,
  guildOnly: false,
  requireArgs: true,
  deleteCommand: false,
  cooldown: 10,
  disabled: false,
  messageExecute: async (message, args) => {
    message.guild.channels.create(args[0], { type: 'text', parent: '689309599928418392'}).then(channel => message.channel.send({
      "embed" : {
        "description" : `:ledger: new topic (${channel}) created`,
        "color" : 7419530
      }
    }))
  }
};
