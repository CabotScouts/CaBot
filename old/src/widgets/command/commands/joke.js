const axios = require('axios')
const api = "https://icanhazdadjoke.com/";

module.exports = {
  name: 'joke',
  aliases: [],
  ownersOnly: false,
  guildOnly: false,
  requireArgs: false,
  deleteCommand: false,
  cooldown: 10,
  disabled: false,
  messageExecute: async (message, args) => {
    axios.get(api, {
      headers : { 'User-Agent': 'Cabot Explorers on Discord', 'Accept': 'application/json' }
    }).then(function(response) {
      message.channel.send({
        "embed" : {
          "description" : response.data.joke,
          "color" : 1146986
        }
      })
    })
  }
};
