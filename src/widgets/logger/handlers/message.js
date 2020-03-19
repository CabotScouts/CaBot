var { getDoc, hasSheet, getSheet, addSheet } = require('../caches/sheetCache')

module.exports = async message => {
  var doc = getDoc()
  var sheet

  if(!hasSheet(message.channel.name)) {
    sheet = await doc.addSheet({
      title: message.channel.name,
      headerValues: ['time', 'userId', 'userName', 'message', 'embeds', 'bot']
     })
    addSheet(message.channel.name, sheet.sheetId)
    sheet = await doc.sheetsById[sheet.sheetId]
  }
  else {
    sheet = await doc.sheetsById[getSheet(message.channel.name)]
  }

  await sheet.addRow({
    time     : message.createdTimestamp.toString(),
    userId   : message.author.id,
    userName : message.author.username,
    message  : message.content,
    embeds   : JSON.stringify(message.embeds),
    bot      : message.author.bot
  })
}
