const storage = require('node-persist')

// TODO: make this display top three integer scores groups, rather than top three people

module.exports = {
  name: 'leaderboard',
  aliases: ['board'],
  ownersOnly: false,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 120,
  disabled: false,
  messageExecute: async (message, args) => {
    await storage.init()
    var leaderboard = await storage.getItem('leaderboard')

    if(leaderboard.length > 0) {
      leaderboard.sort((a, b) => (b.points - a.points))
      // var num = Math.min(leaderboard.length, 3)
      var num = (args[1] == "all") ? leaderboard.length : Math.min(leaderboard.length, 3)
      const medals = [':first_place:', ':second_place:', ':third_place:']
      var fields = []
      for(i = 0; i < leaderboard.length; i++) {
        var user = message.guild.members.cache.get(leaderboard[i].id)
        var points = leaderboard[i].points
        var name = `<@!${leaderboard[i].id}>`
        var plural = (points > 1) ? 'points' : 'point'
        var medal = (i < 3) ? medals[i] : ''

        fields.push({
          "name" : `${medal} ${points} ${plural}`,
          "value" : `${name}\n`
        })
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
