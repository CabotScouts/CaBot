const storage = require('node-persist')

// TODO: make this display top three integer scores groups, rather than top three people

module.exports = {
  name: 'leaderboard',
  aliases: ['board'],
  ownersOnly: false,
  guildOnly: true,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 0,
  disabled: false,
  messageExecute: async (message, args) => {
    await storage.init()
    var leaderboard = await storage.getItem('leaderboard')

    if(leaderboard.length > 0) {
      leaderboard.sort((a, b) => (b.points - a.points))
      var num = (args[0] == "all") ? leaderboard.length : Math.min(leaderboard.length, 3)
      const medals = [':first_place: ', ':second_place: ', ':third_place: ']
      var fields = []

      for(i = 0; i < num; i++) {
        var medal = (i < 3) ? medals[i] : ''
        var points = leaderboard[i].points
        var plural = (points > 1) ? 'points' : 'point'
        var name = `<@!${leaderboard[i].id}>`

        if(points > 0) {
          fields.push({
            "name" : `${medal}${points} ${plural}`,
            "value" : `${name}\n\n`
          })
        }
      }

      message.channel.send({
        "embed": {
          "color": 3447003,
          "fields": fields
        }
      })
    }
    else {
      message.channel.send({
        "embed": {
          "description": "The leaderboard is empty!",
          "color": 3447003
        }
      })
    }
  }
};
