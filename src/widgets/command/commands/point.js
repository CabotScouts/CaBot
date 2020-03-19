const storage = require('node-persist')

module.exports = {
  name: 'point',
  aliases: [],
  ownersOnly: true,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 0,
  disabled: false,
  messageExecute: async (message, args) => {
    if(!message.member.roles.cache.find(r => r.name === 'leader')) return

    await storage.init()
    var leaderboard = await storage.getItem('leaderboard') || []
    var users = message.mentions.users

    if(users.size > 0) {
      var match = []
      var remainder = []

      users.map(user => {
        match = leaderboard.filter(u => u.id == user.id)
        remainder = leaderboard.filter(u => u.id != user.id)

        var add = {}

        if(match.length > 0) {
          match[0].points = match[0].points + 1
          add = match[0]
        }
        else {
          add = {
            id: user.id,
            points: 1
          }
        }

        remainder.push(add)
        leaderboard = remainder
      })

      await storage.setItem('leaderboard', remainder)
      await message.channel.send({
        "embed" : {
          "title" : ":trophy: Points awarded :trophy:",
          "color": 3447003,
        }
      })
    }
  }
};
