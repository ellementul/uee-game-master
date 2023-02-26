const { Member } = require('@ellementul/uee-core')

const timeEvent = require('./events/time_event')
const waitEvent = require('./events/wait_event')
const readyEvent = require('./events/player_ready_event')
const startEvent = require('./events/game_start_event')
const askEvent = require('./events/game_ask_event')
const answerEvent = require('./events/player_answer_event')

const WAIT = "WaitingOfPlayers"
const PLAY = "Playing" 

class GameMaster extends Member {
  constructor() {
    super()
    this.players = new Set
    this.min_players_limit = 2

    this.onEvent(timeEvent, () => this.waitingTime())
    this.onEvent(readyEvent, (payload) => this.readyPlayer(payload))
    this.onEvent(answerEvent, (payload) => this.answerPlayer(payload))
    
    this.role = "GameMaster"

    this.state = WAIT

    this.answers = new Map
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
      this.askPlayer()
    }
  }

  askPlayer() {
    if (this.state != PLAY) return;
    this.answers.clear()

    this.send(askEvent)
  }

  answerPlayer({ uuid, state }) {
    if (this.state != PLAY) return;

    this.answers.set(uuid, state)

    if(this.areAllAnswers()) {
      this.whoWins()
      this.askPlayer()
    }
  }

  whoWins() {
    console.log("wins and lose")
  }

  areAllAnswers() {
    return [...this.players].every(playerUuid => this.answers.has(playerUuid))
  }
}

module.exports = { GameMaster }