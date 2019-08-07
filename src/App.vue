<template>
  <v-app id="homemaintenance">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <router-link to="/">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Dashboard</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/lights">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-lightbulb-on-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Lights</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/schedules">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-calendar-check</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Schedules</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/router">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-router-wireless</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Router</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link to="/settings">
          <v-list-item>
            <v-list-item-action>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Settings</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <HeaderToolbar v-on:close-drawer="drawer = !drawer"/>

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
import HeaderToolbar from "@/components/HeaderToolbar";

export default {
  components: {
    HeaderToolbar
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  data() {
    return {
      drawer: null
    };
  }
};
</script>

<style lang="scss">
#homemaintenance {
  a {
    text-decoration: none;
  }
}
</style>
