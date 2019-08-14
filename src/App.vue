<template>
  <v-app>
    <v-app-bar app color="purple lighten-5">
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline">
        <span class="primary--text">Fodinha</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  }),
})
</script>
