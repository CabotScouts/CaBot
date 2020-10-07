module.exports = async (message, roleID = []) => {
  role = message.guild.roles.cache.find(role => role.id == roleID)

  if(message.member.roles.cache.has(role.id)) {
    message.member.roles.remove(role.id).then(
      message.channel.send({
        "embed" : {
          "description" : `Removed from <@&${role.id}>` ,
          "color" : 1146986
        }
      })
    )
  }
  else {
    message.member.roles.add(roleID).then(
      message.channel.send({
        "embed" : {
          "description" : `Added to <@&${role.id}>`,
          "color" : 1146986
        }
      })
    )
  }
}
