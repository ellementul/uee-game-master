const { Member } = require('@ellementul/uee-core')

const timeEvent = require('./events/time_event')
const waitEvent = require('./events/wait_event')
const readyEvent = require('./events/player_ready_event')
const startEvent = require('./events/game_start_event')

const WAIT = "WaitingOfPlayers"
const PLAY = "Playing" 

class GameMaster extends Member {
  constructor() {
    super()
    this.players = new Set
    this.min_players_limit = 2

    this.onEvent(timeEvent, () => this.waitingTime())
    this.onEvent(readyEvent, (payload) => this.readyPlayer(payload))
    
    this.role = "GameMaster"

    this.state = WAIT
  }

  waitingTime () {
    if (this.state != WAIT) return;

    this.send(waitEvent)
  }

  readyPlayer ({ uuid }) {
    if (this.state != WAIT) return;

    this.players.add(uuid)

    if (this.players.size >= this.min_players_limit) {
      this.state = PLAY
      this.send(startEvent)
    }
  }
}

module.exports = { GameMaster }