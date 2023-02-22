const { EventFactory, Types } = require('@ellementul/uee-core')
const type = Types.Object.Def({
  system: "GameSession",
  entity: "GameState",
  state: "WaitingOfPlayers"
}, true) 
module.exports = EventFactory(type)