<template>
  <v-col cols="12">
    <v-card class="border-top" elevation="4">
      <v-list two-line>
        <template v-for="player in game.players">
          <v-list-item :key="player.name" :inactive="player.lives !== 1">
            <v-list-item-content>
              <v-list-item-title v-text="player.name" />
            </v-list-item-content>

            <v-list-item-action>
              <v-rating
                v-model="player.lives"
                clearable
                full-icon="fa-heart"
                empty-icon="far fa-heart"
                :length="game.totalLives"
                color="red darken-2"
                background-color="red lighten-2"
              />
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>

      <v-card-actions>
        <v-btn color="primary" block large @click="nextRound">
          próxima rodada
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'
import { value, computed } from 'vue-function-api'
import { useStore } from '../store'
import { Player } from '../model/Player'

export default Vue.extend({
  setup(props, ctx) {
    const store = useStore()
    const game = computed(() => store.state.game)

    function nextRound() {
      const newPlayers = game.value.players.filter(player => player.lives !== 0)
      store.commit('setPlayers', newPlayers)

      ctx.emit('nextRound', newPlayers.length)
      ctx.root.$vuetify.goTo(-20)
    }

    return {
      game,
      nextRound,
    }
  },
})
</script>
