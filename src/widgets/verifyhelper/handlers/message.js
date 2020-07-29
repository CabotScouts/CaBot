module.exports = async message => {
  if(message.channel.id == '689264900044095558' && message.content == '<#689264900044095558>') {
    message.channel.send(`Nice one ${message.author}, that's how you send a message - please now send a message with your **name** and **Explorer Unit** so we can verify you`)
  }
}
