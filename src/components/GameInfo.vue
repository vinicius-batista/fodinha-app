<template>
  <v-col cols="12">
    <v-card class="border-top" elevation="4">
      <v-card-text>
        <v-card-text class="text-center">
          <div class="title mb-2 grey--text text--darken-3">
            RODADA {{ round }}
          </div>
          <div class="title mb-2 grey--text text--darken-2">
            {{ cards }} {{ cards === 1 ? 'CARTA' : 'CARTAS' }}
          </div>
        </v-card-text>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    round: Number,
    cards: Number,
  },
})
</script>
