<template>
  <v-container fluid>
    <v-row>
      <GameInfo v-bind="{ round, cards }" />
      <GamePlayersList @nextRound="updateGameInfo" />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { value } from 'vue-function-api'
import GameInfo from '@/components/GameInfo.vue'
import GamePlayersList from '@/components/GamePlayersList.vue'
import { useStore } from '../store'

export default Vue.extend({
  components: { GameInfo, GamePlayersList },
  setup() {
    const round = value(1)
    const cards = value(1)
    const isIncrement = value(true)

    function updateGameInfo(countPlayers: number) {
      round.value++
      if (isIncrement.value) {
        cards.value++

        if (40 / countPlayers < cards.value) {
          cards.value = cards.value - 2
          isIncrement.value = false
        }

        return
      }

      cards.value--

      if (cards.value == 0) {
        cards.value = cards.value + 2
        isIncrement.value = true
      }
    }

    return {
      round,
      cards,
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
