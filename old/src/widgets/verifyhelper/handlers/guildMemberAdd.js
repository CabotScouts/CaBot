module.exports = async member => {
  explorer = member.roles.cache.has('explorer')
  leader = member.roles.cache.has('leader')
  network = member.roles.cache.has('network')
  if(explorer || leader || network) return

  await new Promise(resolve => setTimeout(resolve, 5000))

  await member.guild.channels.cache.find(ch => ch.id == '689264900044095558').send(`<:scout:693531748696326245> Welcome to Cabot Explorers on Discord ${member} - before you can access the server we need to check that you're an Explorer - please reply here with your **name** and **Explorer Unit**, and wait for a leader to verify you`)

  await member.guild.channels.cache.find(ch => ch.id == '689298055517962330').send(`:bell: ${member} requires verification`)
};
