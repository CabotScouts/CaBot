const storage = require('node-persist')

module.exports = async client => {
  await storage.init()
  if(!(await storage.getItem('counter'))) await storage.setItem('counter', 0)
  if(!(await storage.getItem('leaderboard'))) await storage.setItem('leaderboard', [])

  require('../util/loadCommands')(client);
  console.log('command: ready');
};
