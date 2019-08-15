import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import { RootState } from './types'

Vue.use(Vuex)

const store = new Vuex.Store<RootState>({
  state,
  mutations,
  actions: {},
})

export default store

export function useStore() {
  return store
}
