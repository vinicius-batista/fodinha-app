<template>
  <v-container fluid>
    <v-row>
      <GameInfo v-bind="state" />
      <GamePlayersList @nextRound="updateGameInfo" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { reactive, computed } from '@vue/composition-api'
import GameInfo from '@/components/GameInfo.vue'
import GamePlayersList from '@/components/GamePlayersList.vue'
import { useStore } from '../store'
import { useRouter } from '../router'

export default Vue.extend({
  components: { GameInfo, GamePlayersList },
  setup() {
    const state = reactive({
      round: 1,
      cards: 1,
      isIncrement: true,
      isCardsLimited: false,
    })

    function updateGameInfo(countPlayers: number) {
      if (countPlayers <= 2) {
        const store = useStore()
        store.commit('setPlayers', [])
        const router = useRouter()
        router.push({ name: 'home' })
      }

      state.round++
      if (state.isIncrement) {
        state.cards++

        if (40 / countPlayers < state.cards) {
          state.cards = state.cards - 2
          state.isIncrement = false
        }

        state.isCardsLimited = countPlayers * state.cards === 40
        return
      }

      state.cards--

      if (state.cards == 0) {
        state.cards = state.cards + 2
        state.isIncrement = true
      }

      state.isCardsLimited = countPlayers * state.cards === 40
    }

    return {
      state,
      updateGameInfo,
    }
  },
})
</script>

<style lang="scss">
.border-top {
  border-top: 0.3em solid #7b1fa2 !important;
}
</style>
