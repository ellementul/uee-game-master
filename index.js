const { Member } = require('@ellementul/uee-core')

const timeEvent = require('./events/time_event')
const yourEvent = require('./events/wait_event')
class YourMember extends Member {
  constructor() {
    super()
    this.players = new Set
    this.min_players_limit = 2

    this.onEvent(timeEvent, () => this.updateTime())
    
    this.role = "GameMaster"
  }

  updateTime () {
    this.send()
  }
}

module.exports = { 
  YourMember, // Export of your member
  events: { // Export of your events
    // outside: outsideEvent, // We don't export outside events!
    your: yourEvent
  }
}