import { MutationTree } from 'vuex'
import { RootState } from './types'
import { Player } from '@/model/Player'

const mutations: MutationTree<RootState> = {
  setPlayers(state, players: Player[]) {
    state.players = players
  },
}

export default mutations
