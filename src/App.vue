<template>
  <v-app>
    <v-app-bar app color="purple lighten-5">
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline">
        <span class="primary--text">Fodinha</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog
        v-model="state.isDialogOpen"
        max-width="600px"
        v-if="state.isGameView"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon>
            <v-icon color="primary" v-on="on">fa-plus</v-icon>
          </v-btn>
        </template>
        <v-card class="pa-5">
          <v-autocomplete
            name="jogador"
            filled
            label="Nome do jogador"
            :items="state.names"
            v-model="state.playerName"
            :search-input.sync="state.searchPlayer"
          />

          <v-btn color="primary" @click="addPlayer" block>adicionar</v-btn>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { reactive, computed } from '@vue/composition-api'
import { useStore } from './store'
import { createPlayer } from './model/Player'
import { useRouter } from './router'

export default Vue.extend({
  name: 'App',
  setup() {
    const router = useRouter()

    const state = reactive({
      isDialogOpen: false,
      playerName: '',
      searchPlayer: '',
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
      isGameView: computed(() => router.app.$route.name === 'game'),
    })

    function addPlayer() {
      const store = useStore()
      const players = store.state.game.players

      store.commit('setPlayers', [
        ...players,
        createPlayer(state.playerName || state.searchPlayer),
      ])

      state.isDialogOpen = false
    }

    return { state, addPlayer }
  },
})
</script>
