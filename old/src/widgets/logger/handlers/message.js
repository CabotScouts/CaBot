var { getDoc, hasSheet, getSheet, addSheet } = require('../caches/sheetCache')

module.exports = async message => {
  if(message.channel.type == 'text') sheetTitle = message.channel.name
  else if(message.channel.type == 'dm') sheetTitle = 'dm-' + message.author.username

  var doc = getDoc()
  var sheet

  if(!hasSheet(sheetTitle)) {
    sheet = await doc.addSheet({
      title: sheetTitle,
      headerValues: ['time', 'userId', 'userName', 'message', 'embeds', 'attachments', 'bot']
     })
    await addSheet(sheetTitle, sheet.sheetId)
    sheet = await doc.sheetsById[sheet.sheetId]
  }
  else {
    sheet = await doc.sheetsById[getSheet(sheetTitle)]
  }

  await sheet.addRow({
    time        : message.createdTimestamp.toString(),
    userId      : message.author.id,
    userName    : message.author.username,
    message     : message.content,
    embeds      : JSON.stringify(message.embeds),
    attachments : JSON.stringify(message.attachments),
    bot         : message.author.bot
  })
}
