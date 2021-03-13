<template>
  <div>
    <v-data-table

        :headers="headersData"
        :items="tableData"
        :items-per-page="10"
        class="elevation-1 mt-5"
        @click:row="handleClick"
    />
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {TYPES} from "@/types";

export default {
  name: "Results",
  data() {
    return {}
  },
  computed: {
    ...mapState({
      type: s => s.type,
      packageName: s => s.packageName
    }),
    ...mapGetters({
      tableData: 'GET_DATA',
      headersData: 'GET_HEADERS'
    }),

  },
  methods: {
    handleClick(e) {
      if (this.type !== TYPES.POPULAR) {
        const name = this.packageName + '@' + e.version
        this.$store.dispatch('SEARCH_PACKAGE_DETAILS', {name, type: TYPES.PACKAGE_DETAILS})
        this.$store.commit('SET_POPUP', {name, state: true})
      }
    }
  },
}
</script>

<style scoped>

</style>
