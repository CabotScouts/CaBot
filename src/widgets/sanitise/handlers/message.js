const words = require('../words.json')
const addPoints = require('../../command/util/addPoints')

module.exports = async message => {
  if(message.channel.type != 'text') return
  if(message.author.bot) return
  if(message.system) return
  if(message.member.roles.cache.find(r => r.name === 'leader')) return

  check = message.toString().toLowerCase().split(" ")
  bad = check.map(word => words.includes(word)).includes(true)

  if(bad === true) {
    // addPoints(message, -10, message.author.id)
    message.client.channels.cache.find(ch => ch.name === 'system').send(`:warning: ${message.author} swore in ${message.channel} (${message.toString()})`)
  }
}
