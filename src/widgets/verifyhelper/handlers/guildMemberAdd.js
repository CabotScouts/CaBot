module.exports = async member => {
  explorer = member.roles.cache.has('explorer')
  leader = member.roles.cache.has('leader')
  if(explorer || leader) return

  member.guild.channels.cache.find(ch => ch.name === 'verify').send(`:fleur_de_lis: Welcome to Cabot Explorers on Discord ${member} - before you can access the server we need to check that you're an Explorer - please reply here with your **name** and **Explorer Unit**, and wait for a leader to verify you`)
  member.guild.channels.cache.find(ch => ch.name === 'system').send(`:bell: ${member} requires verification`)
};
