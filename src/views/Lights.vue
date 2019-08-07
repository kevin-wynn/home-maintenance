<template>
  <v-flex shrink>
    <AddLightForm/>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="lights"
      :single-select="singleSelect"
      item-key="room"
      show-select
      class="elevation-1"
    >
    </v-data-table>
  </v-flex>
</template>

<script>
import AddLightForm from "../components/AddLightForm";

export default {
  name: "Lights",
  components: {
    AddLightForm
  },
  mounted() {
    this.getAllLights();
  },
  methods: {
    getAllLights: function() {
      fetch("/lights/getAllLights")
        .then(resp => resp.json())
        .then(data => {
          data.forEach((light, i, arr) => {
            arr[i].last_replaced = new Date(
              light.last_replaced
            ).toLocaleString();
          });
          this.lights = data;
        });
    }
  },
  data() {
    return {
      dialog: false,
      singleSelect: true,
      selected: [],
      headers: [
        { text: "Room", align: "left", value: "room" },
        { text: "Type", value: "type" },
        { text: "Brand", value: "brand" },
        { text: "Temp", value: "temp" },
        { text: "Volts", value: "volt" },
        { text: "Watts", value: "watt" },
        { text: "Last Replaced", value: "last_replaced" }
      ],
      lights: []
    };
  }
};
</script>