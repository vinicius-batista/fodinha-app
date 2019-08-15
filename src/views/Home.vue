<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="pa-2" elevation="4">
          <v-card-title class="pb-5 flex justify-center">
            cria esse jogo ai
          </v-card-title>

          <v-form class="mt-5" @submit.prevent="startGame">
            <v-slider
              label="Vidas"
              v-model="lives"
              min="1"
              max="5"
              thumb-label="always"
            />

            <v-text-field
              name="jogador"
              label="Nome do jogador"
              v-model="playerName"
              append-icon="fa-plus"
              @click:append="addPlayer"
            />

            <PlayersList :players="players" />

            <v-btn type="submit" color="primary" block large>começar</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { value } from 'vue-function-api'
import { Player, createPlayer } from '@/model/Player'
import PlayersList from '@/components/PlayersList.vue'
import { useRouter } from '../router'
import { useStore } from '../store'

export default Vue.extend({
  components: {
    PlayersList,
  },
  setup() {
    const lives = value(3)
    const playerName = value('')
    const players = value<Player[]>([])

    function addPlayer() {
      const player = createPlayer(playerName.value)
      players.value = [...players.value, player]
      playerName.value = ''
    }

    function startGame() {
      players.value = players.value.map(
        (player): Player => {
          return {
            ...player,
            lives: lives.value,
          }
        }
      )

      const store = useStore()
      store.commit('setPlayers', players.value)

      const router = useRouter()
      router.push({ name: 'game' })
    }

    return {
      lives,
      playerName,
      players,
      addPlayer,
      startGame,
    }
  },
})
</script>
