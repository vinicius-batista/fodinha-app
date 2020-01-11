import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import { RootState } from './types'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersistence<RootState>({
  storage: window.localStorage,
})

const store = new Vuex.Store<RootState>({
  state,
  mutations,
  actions: {},
  plugins: [vuexPersist.plugin],
})

export default store

export function useStore() {
  return store
}
