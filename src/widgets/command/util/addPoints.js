const storage = require('node-persist')

module.exports = async (message, points, ids = []) => {
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
        var updated = match[0].points + points
        match[0].points = updated
        add = match[0]
      }
      else {
        add = {
          id: user,
          points: points
        }
        var updated = points
      }

      if(Math.abs(updated) > 0) remainder.push(add) // if 0 points don't store
      leaderboard = remainder
    })

    var plural = (Math.abs(points) > 1) ? 'points' : 'point'
    var action = (points > 0) ? 'awarded :medal:' : 'removed :poo:'

    await storage.setItem('leaderboard', remainder)
    await message.channel.send({
      "embed" : {
        "description" : `${Math.abs(points)} ${plural} ${action}`,
        "color": 3447003,
      }
    })
  }
}
