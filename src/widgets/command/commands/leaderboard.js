const storage = require('node-persist')

module.exports = {
  name: 'leaderboard',
  aliases: [],
  ownersOnly: false,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 120,
  disabled: false,
  messageExecute: async (message, args) => {
    var title = ":trophy: Leaderboard :trophy:"
    await storage.init()
    var leaderboard = await storage.getItem('leaderboard')

    if(leaderboard.length > 0) {
      leaderboard.sort((a, b) => (b.points - a.points))
      var num = Math.min(leaderboard.length, 3)
      const medals = [':first_place:', ':second_place:', ':third_place:']
      var fields = []
      for(i = 0; i < num; i++) {
        // var user = message.guild.members.cache.get(leaderboard[i].id)
        var points = leaderboard[i].points
        var name = `<@!${leaderboard[i].id}>`
        var plural = (points > 1) ? 'points' : 'point'

        fields.push({
          "name" : `${medals[i]} - ${points} ${plural}`,
          "value" : `${name}\n`
        })
      }

      message.channel.send({
        "embed": {
          // "title" : title,
          "color": 3447003,
          "fields": fields
        }
      })
    }
    else {
      message.channel.send({
        "embed": {
          // "title" : title,
          "description": "The leaderboard is empty!",
          "color": 3447003
        }
      })
    }
  }
};
