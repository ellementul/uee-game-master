const { EventFactory, Types } = require('@ellementul/uee-core')
// Defined a type of event what you want to listen  
const type = Types.Object.Def({
  system: "TheOutsideSystem",
  entity: "TheOutsideEntity",
  action: "Start"
})
module.exports = EventFactory(type)