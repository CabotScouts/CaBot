module.exports = {
  name: 'message',
  aliases: ['m'],
  ownersOnly: false,
  guildOnly: false,
  requireArgs: true,
  deleteCommand: true,
  cooldown: 10,
  disabled: false,
  messageExecute: async (message, args) => {
    if(!message.member.roles.cache.find(r => r.name === 'leader')) return;

    channelName = args.shift();
    send = args.join(' ');

    channel = message.client.channels.cache.find(ch => ch.name === channelName);
    if(channel) {
      if(send.length > 0) channel.send(send);
    }
    else {
      message.channel.send(`:warning: unknown channel '${channelName}'`);
    }
  }
};
