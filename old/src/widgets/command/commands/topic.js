module.exports = {
  name: 'topic',
  aliases: ['t'],
  ownersOnly: false,
  guildOnly: true,
  requireArgs: true,
  deleteCommand: false,
  cooldown: 10,
  disabled: false,
  messageExecute: async (message, args) => {
    var topic = args.join('-').toLowerCase().replace(/[$&+,:;=?@#|'<>.^*()%!_]/g, '-')
    message.guild.channels.create(topic, { type: 'text', parent: '689309599928418392'}).then(channel => message.channel.send({
      "embed" : {
        "description" : `:ledger: new topic (${channel}) created`,
        "color" : 7419530
      }
    }))
  }
};
