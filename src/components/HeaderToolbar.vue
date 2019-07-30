<template>
  <v-app-bar app clipped-left>
    <v-app-bar-nav-icon @click.stop="$emit('close-drawer')"></v-app-bar-nav-icon>
    <v-toolbar-title>Home Maintenance Checklist</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click.prevent="$vuetify.theme.dark = !$vuetify.theme.dark">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
  </v-app-bar>
</template>