const { GameMaster } = require('./src/index')

module.exports = { 
  GameMaster,
  events: {
    wait: require('./events/wait_event')
  }
}