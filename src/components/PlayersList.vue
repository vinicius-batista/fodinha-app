<template>
  <v-list>
    <p>JOGADORES</p>
    <v-list-item v-for="(player, i) in players" :key="i">
      <v-list-item-content>
        <v-list-item-title v-text="player.name"></v-list-item-title>
      </v-list-item-content>
      <v-list-item-action @click="$emit('removePlayer', i)">
        <v-icon>fa-trash</v-icon>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    players: {
      type: Array,
    },
  },
})
</script>
