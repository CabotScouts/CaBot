const words = require('../words.json')

module.exports = async message => {
  if(message.channel.type != 'text') return
  if(message.author.bot) return
  if(message.system) return
  if(message.member.roles.cache.find(r => r.name === 'leader')) return

  check = message.toString().toLowerCase().split(" ")
  bad = check.map(word => words.includes(word)).includes(true)

  if(bad === true) {
    // strike 1 - send a warning message
    // strike 2 - kick user
    // strike 3 - ban user
    // message.channel.send(`:disappointed_relieved: *that's a bad word*`)

    message.client.channels.cache.find(ch => ch.name === 'system').send(`:warning: ${message.author} swore in ${message.channel} (${message.toString()})`)
  }
}
