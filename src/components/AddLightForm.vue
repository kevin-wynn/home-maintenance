<template>
  <v-layout class="my-5">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add New Light</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add New Light</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-select
                  :items="rooms"
                  v-model="form.room"
                  label="Room"
                  hint="Select the room where the light is in"
                  persistent-hint
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="form.type" label="Type"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="form.brand" label="Brand"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="form.temp" label="Temp"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="form.description" label="Description"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="form.volt" label="Volts"></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field v-model="form.watt" label="Watts"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-date-picker v-model="form.last_replaced" label="Last Replaced"></v-date-picker>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveForm">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
const defaultForm = {
  room: null,
  type: null,
  temp: null,
  description: null,
  last_related: null,
  brand: null,
  volt: null,
  watt: null
};
export default {
  data: () => ({
    dialog: false,
    form: defaultForm,
    rooms: [
      "Master Bedroom",
      "Guest Bedroom",
      "Office",
      "Entry",
      "Living Room",
      "Dining Room",
      "Breakfast Nook",
      "Kitchen",
      "Backyard",
      "Frontyard",
      "Master Bathroom",
      "Guest Bathroom",
      "Laundry Room",
      "Garage"
    ]
  }),
  methods: {
    saveForm: function() {
      fetch("/lights/saveLight", {
        method: "POST",
        body: JSON.stringify(this.form),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(data => {
          this.dialog = false;
          this.form = defaultForm;
        });
    }
  }
};
</script>