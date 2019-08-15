<template>
  <v-col cols="12">
    <v-card class="border-top" elevation="4">
      <v-list two-line>
        <v-list-item-group
          v-model="selected"
          multiple
          active-class="primary--text"
        >
          <template v-for="player in players">
            <v-list-item :key="player.name">
              <v-list-item-content>
                <v-list-item-title v-text="player.name" />
              </v-list-item-content>

              <v-list-item-action>
                <v-rating
                  v-model="player.lives"
                  readonly
                  full-icon="fa-heart"
                  :length="player.lives"
                  color="red darken-2"
                />
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list-item-group>
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
    const selected = value<number[]>([])
    const store = useStore()
    const players = computed(() => store.state.players)

    function nextRound() {
      const playersRemovedLives = players.value.map(
        (player, index): Player => {
          const lostPoint = selected.value.indexOf(index) !== -1

          return {
            ...player,
            lives: lostPoint ? player.lives - 1 : player.lives,
          }
        }
      )

      const newPlayers = playersRemovedLives.filter(
        player => player.lives !== 0
      )
      store.commit('setPlayers', newPlayers)

      selected.value = []
      ctx.emit('nextRound', newPlayers.length)
      ctx.root.$vuetify.goTo(-20)
    }

    return {
      selected,
      players,
      nextRound,
    }
  },
})
</script>
