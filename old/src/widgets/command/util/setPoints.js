const storage = require('node-persist')

module.exports = async (message, points, ids = []) => {
  if(!(message.member.roles.cache.find(r => r.name === 'leader') || message.member.roles.cache.find(r => r.name === 'bot'))) return

  await storage.init()
  var leaderboard = await storage.getItem('leaderboard') || []
  var users = [ ...message.mentions.users.keys() ].concat(ids)

  if(users.length > 0) {
    var match = []
    var remainder = []

    users.map(user => {
      match = leaderboard.filter(u => u.id == user)
      remainder = leaderboard.filter(u => u.id != user)

      var add = {}

      if(match.length > 0) {
        match[0].points = points
        add = match[0]
      }
      else {
        add = {
          id: user,
          points: points
        }
      }

      if(Math.abs(points) > 0) remainder.push(add) // if 0 points don't store
      leaderboard = remainder
    })

    await storage.setItem('leaderboard', remainder)
    await message.channel.send({
      "embed" : {
        "description" : `Set points to ${points} :eyes:`,
        "color": 3447003,
      }
    })
  }
}
