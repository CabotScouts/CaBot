const channels = [ 'chat' ]

module.exports = {
  name: 'announce',
  aliases: ['a'],
  ownersOnly: false,
  guildOnly: true,
  requireArgs: true,
  deleteCommand: false,
  cooldown: 0,
  disabled: true,
  messageExecute: async (message, args) => {
    if(!message.member.roles.cache.find(r => r.name === 'leader')) return

    var announcement = args.join(' ')
    var embed = {
      "embed": {
        "title": `:loudspeaker:`,
        "description" : announcement,
        "color": 16580705
      }
    }

    channels.map(ch => message.client.channels.cache.find(lst => lst.name === ch).send(embed))
  }
};
