module.exports = async (oldMember, newMember) => {
  explorerAdded = !oldMember.roles.cache.has('689256639265636382') && newMember.roles.cache.has('689256639265636382')
  leaderAdded = !oldMember.roles.cache.has('689256880836444182') && newMember.roles.cache.has('689256880836444182')
  networkAdded = !oldMember.roles.cache.has('694565693181526036') && newMember.roles.cache.has('694565693181526036')

  if(explorerAdded) {
    newMember.guild.channels.cache.find(ch => ch.id == '689271687078084707').send(`<:scout:693531748696326245> Welcome to Cabot Explorers on Discord ${newMember} - say hello!`)

    newMember.guild.channels.cache.find(ch => ch.id == '689298055517962330').send(`:star: ${newMember} was verified as an Explorer`)
  }

  if(leaderAdded) {
    newMember.guild.channels.cache.find(ch => ch.id == '689552904511553591').send(`<:scout:693531748696326245> Welcome to the leaders lounge ${newMember}`)

    newMember.guild.channels.cache.find(ch => ch.id == '689298055517962330').send(`:star: ${newMember} was verified as a leader`)
  }

  if(networkAdded) {
    newMember.guild.channels.cache.find(ch => ch.name === 'gromit').send(`<:scout:693531748696326245> Welcome to the network chat ${newMember}`)

    newMember.guild.channels.cache.find(ch => ch.id == '689298055517962330').send(`:star: ${newMember} was verified as a Networker`)
  }
};
