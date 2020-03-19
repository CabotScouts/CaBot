module.exports = async (oldMember, newMember) => {
  explorerAdded = !oldMember.roles.cache.has('689256639265636382') && newMember.roles.cache.has('689256639265636382')
  leaderAdded = !oldMember.roles.cache.has('689256880836444182') && newMember.roles.cache.has('689256880836444182')

  if(explorerAdded) {
    newMember.guild.channels.cache.find(ch => ch.name === 'chat').send(`:fleur_de_lis: Welcome to Cabot Explorers on Discord ${newMember} - say hello!`)
    newMember.guild.channels.cache.find(ch => ch.name === 'system').send(`:star: ${newMember} was verified`)
  }

  if(leaderAdded) {
    newMember.guild.channels.cache.find(ch => ch.name === 'leaders').send(`:fleur_de_lis: Welcome to the leaders lounge ${newMember}`)
  }
};
