const { Member } = require('@ellementul/uee-core')

const outsideEvent = require('./events/outside_event')
const yourEvent = require('./events/your_event')
class YourMember extends Member {
  constructor() {
    super()

    this.onEvent(outsideEvent, () => this.callback()) // Subscribing on event
    
    this.role = "DefaultMemberRole" // The manager needs it, and manager can change it
  }

  callback () {
    this.send(yourEvent, {
      state: "NewYourStateOfYourEntity" // Fill the state property in the event
      // If we don't fill the property, this property will be random.
    })
  }
}

module.exports = { 
  YourMember, // Export of your member
  events: { // Export of your events
    // outside: outsideEvent, // We don't export outside events!
    your: yourEvent
  }
}