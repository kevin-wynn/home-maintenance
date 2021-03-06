<template>
  <v-flex class="schedules">
    <AddEventForm />
    <v-sheet height="64">
      <v-toolbar flat>
        <v-btn outlined class="mr-4" @click="setToday">
          Today
        </v-btn>
        <v-btn fab text small @click="prev">
          <v-icon small>mdi-arrow-left-drop-circle</v-icon>
        </v-btn>
        <v-btn fab text small @click="next">
          <v-icon small>mdi-arrow-right-drop-circle</v-icon>
        </v-btn>
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right>
          <template v-slot:activator="{ on }">
            <v-btn
              outlined
              v-on="on"
            >
              <span>{{ typeToLabel[type] }}</span>
              <v-icon right>mdi-arrow-down-drop-circle-outline</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="type = 'day'">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="events"
        :event-color="getEventColor"
        :event-margin-bottom="3"
        :now="today"
        :type="type"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:date="viewDay"
        @change="updateRange"
      ></v-calendar>
      <v-menu
        v-model="selectedOpen"
        :close-on-content-click="false"
        :activator="selectedElement"
        full-width
        offset-x
      >
        <v-card
          color="grey lighten-4"
          min-width="350px"
          flat
        >
          <v-toolbar :color="selectedEvent.color">
            <v-btn icon>
              <v-icon>mdi-calendar-edit</v-icon>
            </v-btn>
            <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <span v-html="selectedEvent.description"></span>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="secondary" @click="selectedOpen = false">
              Cancel
            </v-btn>
            <v-btn text color="warning" @click="deleteEvent(selectedEvent)">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-sheet>
  </v-flex>
</template>

<script>
import AddEventForm from "@/components/AddEventForm";
import moment from "moment";

export default {
  name: "Schedules",
  components: {
    AddEventForm
  },
  mounted: function() {
    this.getEvents();
  },
  data: () => ({
    today: moment().format("YYYY-MM-DD"),
    focus: moment().format("YYYY-MM-DD"),
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day"
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: []
  }),
  computed: {
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const endMonth = this.monthFormatter(end);
      const suffixMonth = startMonth === endMonth ? "" : endMonth;

      const startYear = start.year;
      const endYear = end.year;
      const suffixYear = startYear === endYear ? "" : endYear;

      const startDay = start.day + this.nth(start.day);
      const endDay = end.day + this.nth(end.day);

      switch (this.type) {
        case "month":
          return `${startMonth} ${startYear}`;
        case "week":
        case "day":
          return `${startMonth} ${startDay} ${startYear}`;
      }
      return "";
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "CST",
        month: "long"
      });
    }
  },
  methods: {
    deleteEvent(event) {
      fetch("/schedules/deleteEvent", {
        method: "DELETE",
        body: JSON.stringify({ id: event._id }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(() => {
        this.getEvents();
        this.selectedOpen = false;
      });
    },
    getEvents() {
      fetch("/schedules/getAllEvents")
        .then(resp => resp.json())
        .then(data => {
          data.forEach((date, i, arr) => {
            arr[i].start = moment(date.start).format("YYYY-MM-DD");
            arr[i].end = moment(date.end).format("YYYY-MM-DD");
          });

          this.events = data;
        });
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      // You could load events from an outside source (like database) now that we have the start and end dates on the calendar
      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    }
  }
};
</script>

<style lang="scss">
.schedules {
  .v-calendar-weekly__day-label {
    .v-btn {
      margin-bottom: 3px;
    }
  }
}

.v-card__text {
  span {
    color: #303030;
  }
}
</style>
