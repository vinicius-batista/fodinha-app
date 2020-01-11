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
              v-model="state.lives"
              min="1"
              max="5"
              thumb-label="always"
            />

            <v-autocomplete
              name="jogador"
              filled
              label="Nome do jogador"
              :items="state.names"
              v-model="state.playerName"
              :search-input.sync="state.searchPlayer"
              append-icon="fa-plus"
              @click:append="addPlayer"
            />

            <PlayersList
              :players="state.players"
              @removePlayer="removePlayer"
            />

            <v-btn type="submit" color="primary" block large>começar</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { reactive, onMounted } from '@vue/composition-api'
import { Player, createPlayer } from '@/model/Player'
import PlayersList from '@/components/PlayersList.vue'
import { useRouter } from '../router'
import { useStore } from '../store'
import { createGame } from '../model/Game'

export default Vue.extend({
  components: {
    PlayersList,
  },
  setup() {
    const store = useStore()
    const state = reactive({
      lives: 3,
      playerName: '',
      searchPlayer: '',
      players: [] as Player[],
      names: [
        'Adilson',
        'Batista',
        'Celso',
        'Danilo',
        'Euller',
        'Lucao',
        'JMoniz',
        'JCarlos',
        'Todynho',
        'Wendler',
      ],
    })

    onMounted(() => {
      if (store.state.game.players.length !== 0) {
        const router = useRouter()
        router.push({ name: 'game' })
      }
    })

    function addPlayer() {
      if (state.playerName !== '') {
        const player = createPlayer(state.playerName)
        state.players = [...state.players, player]
        state.playerName = ''
        return
      }

      const player = createPlayer(state.searchPlayer)
      state.players = [...state.players, player]
      state.searchPlayer = ''
    }

    function startGame() {
      state.players = state.players.map(
        (player): Player => {
          return {
            ...player,
            lives: state.lives,
          }
        }
      )

      const game = createGame(state.players, state.lives)
      store.commit('setGame', game)

      const router = useRouter()
      router.push({ name: 'game' })
    }

    function removePlayer(position: number) {
      state.players = state.players.filter((_, index) => position !== index)
    }

    return {
      state,
      addPlayer,
      startGame,
      removePlayer,
    }
  },
})
</script>
