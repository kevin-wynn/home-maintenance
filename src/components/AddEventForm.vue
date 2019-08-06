<template>
  <v-layout class="my-5">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Add New Event</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add New Event</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="form.name" label="Title"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-select
                  :items="repeat"
                  v-model="form.repeat"
                  label="Repeat"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field v-model="form.description" label="Description"></v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-color-picker
                mode="hexa"
                :show-swatches="true"
                :hide-inputs="true"
                :hide-mode-switch="true"
                :hide-canvas="true"
                :swatches="swatches"
                v-model="form.color"></v-color-picker>
              </v-flex>
              <v-flex xs12 sm3 md6>
                <v-label>Start Date</v-label>
                <v-date-picker v-model="form.start" label="Start Date"></v-date-picker>
              </v-flex>
              <v-flex xs12 sm63 md6>
                <v-label>End Date</v-label>
                <v-date-picker v-model="form.end" label="End Date"></v-date-picker>
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
  repeat: "None",
  name: null,
  start: null,
  end: null,
  color: "#ff2200",
  description: null
};
export default {
  data: () => ({
    dialog: false,
    form: defaultForm,
    swatches: [["#d91e18"], ["#2c82c9"], ["#2ecc71"], ["#f7ca18"], ["#f15a22"]],
    repeat: ["None", "Weekly", "Bi-Weekly", "Monthly"]
  }),
  methods: {
    saveForm: function() {
      fetch("/schedules/saveEvent", {
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