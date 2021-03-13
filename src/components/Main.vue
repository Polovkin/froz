<template>
  <v-container>
    <v-dialog
        transition="dialog-bottom-transition"
        v-model="error"
        width="500"
    >
      <v-card>
        <v-card-title class="headline lighten-2">
          {{ alert }}
        </v-card-title>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="details"
        persistent
        max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          {{ popup.name }}
        </v-card-title>
        <v-card-text v-if="details">
          <v-list dense>
            <v-subheader>Package Info:</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-content>
                  <b>Package Size</b>
                  {{ packageDetails.total }}
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <b>Package Last Stable Version</b>
                  {{ data.tags.latest }}
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="green darken-1"
              text
              @click="details = false"
          >
            Close
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
    <Search/>
    <Results/>
  </v-container>
</template>

<script>
import {mapState} from 'vuex'
import Search from "@/components/Search";
import Results from "@/components/Results";

export default {
  name: 'Main',
  components: {Results, Search},
  data: () => ({
    error: false,
    details: false
  }),
  computed: {
    ...mapState({
      alert: s => s.errorMsg,
      popup: s => s.details,
      packageName: s => s.packageName,
      packageDetails: s => s.packageDetails,
      data: s => s.data
    })
  },
  watch: {
    alert(newValue) {
      this.error = !!newValue
    },
    popup(newValue) {
      this.details = !!newValue
    },
  },
}
</script>
