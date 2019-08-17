import { MutationTree } from 'vuex'
import { RootState } from './types'
import { Game } from '@/model/Game'
import { Player } from '@/model/Player'

const mutations: MutationTree<RootState> = {
  setGame(state, game: Game) {
    state.game = game
  },
  setPlayers(state, players: Player[]) {
    state.game.players = players
  },
}

export default mutations
