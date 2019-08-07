<template>
  <div>
    <v-container v-if="loadingDevices">
      <v-layout wrap>
        <v-flex>
          <v-progress-circular
              :size="50"
              color="primary"
              indeterminate
            ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container v-else fluid grid-list-md pa-2>
      <h1>{{ router.ModelName }} - <small> {{ router.Description }}</small></h1>
      <v-layout wrap>
        <v-flex v-for="device in devices" :key="device.id">
          <v-card>
            <v-card-text>
              <div>{{ device.Name }}<small v-if="device.DeviceModel"> - {{ device.DeviceModel }}</small></div>
              <p class="display-1 text--primary">
                {{ device.IP }}
              </p>
              <p>MAC: {{ device.MAC }}</p>
              <div class="text--primary">
                Connection: {{ device.ConnectionType }}
              </div>
            </v-card-text>
            <v-card-actions>
              <!--  -->
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Router",
  data: function() {
    return {
      router: {},
      devices: [],
      loadingDevices: true
    };
  },
  mounted: function() {
    fetch("/netgear/getDevices")
      .then(resp => resp.json())
      .then(data => {
        this.devices = data;
        this.loadingDevices = false;
      });
    fetch("/netgear/getRouterInformation")
      .then(resp => resp.json())
      .then(data => {
        this.router = data;
      });
  }
};
</script>

<style>
</style>
