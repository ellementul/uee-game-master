const { Provider } = require('@ellementul/uee-core')
const { YourMember } = require('./index')

describe('YourMember', () => {

  test('constructor', () => {
    const yourMember = new YourMember
    expect(yourMember).toBeDefined();
  });

  test('trigger event', () => {

    // Member connect to test provider
    const provider = new Provider
    const yourMember = new YourMember
    yourMember.setProvider(provider)

    // Subscribe to testing event
    const yourEvent = require('./events/your_event')
    const yourEventCallback = jest.fn()
    provider.onEvent(yourEvent, yourEventCallback)

    // Run the event to has to run the testing event
    const outsideEvent = require('./events/outside_event')
    provider.sendEvent(outsideEvent.create())

    // Check calling of the testing event
    expect(yourEventCallback).toHaveBeenCalled();
  });
});