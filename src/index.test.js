const { Provider } = require('@ellementul/uee-core')
const { GameMaster } = require('./index')

describe('GameMaster', () => {

  test('constructor', () => {
    const gameMaster = new GameMaster
    expect(gameMaster).toBeDefined();
  });

  test('wait event', () => {

    // Member connect to test provider
    const provider = new Provider
    const gameMaster = new GameMaster
    gameMaster.setProvider(provider)

    // Subscribe to testing event
    const waitEvent = require('./events/wait_event')
    const waitEventCallback = jest.fn()
    provider.onEvent(waitEvent, waitEventCallback)

    // Run the event to has to run the testing event
    const timeEvent = require('./events/time_event')
    provider.sendEvent(timeEvent.create())

    // Check calling of the testing event
    expect(waitEventCallback).toHaveBeenCalled();
  });

  test('coonecting of players', () => {

    // Member connect to test provider
    const provider = new Provider
    const gameMaster = new GameMaster
    gameMaster.setProvider(provider)

    // Subscribe to testing event
    const startEvent = require('./events/game_start_event')
    const startEventCallback = jest.fn()
    provider.onEvent(startEvent, startEventCallback)

    // Run the event to has to run the testing event
    const readyEvent = require('./events/player_ready_event')
    provider.sendEvent(readyEvent.create())
    provider.sendEvent(readyEvent.create())

    // Check calling of the testing event
    expect(startEventCallback).toHaveBeenCalledTimes(1);

    //End of waiting of players
    const waitEvent = require('./events/wait_event')
    const waitEventCallback = jest.fn()
    provider.onEvent(waitEvent, waitEventCallback)

    // Run the event to has to run the testing event
    const timeEvent = require('./events/time_event')
    provider.sendEvent(timeEvent.create())
    provider.sendEvent(readyEvent.create())

    // Check calling of the testing event
    expect(waitEventCallback).toHaveBeenCalledTimes(0)
    expect(startEventCallback).toHaveBeenCalledTimes(1)
  });
});