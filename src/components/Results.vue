<template>
  <div>
    <v-data-table
        :headers="headers"
        :items="tableData"
        :items-per-page="10"
        class="elevation-1"
        @click:row="handleClick"
    />
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "Results",
  data() {
    return {
      headersPopular: [
        {
          text: 'Most popular packages',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'Type', value: 'type'},
        {text: 'Hits', value: 'hits'},
      ],
      headerPackage: [
        {
          text: 'TEST',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        {text: 'TEST', value: 'type'},
        {text: 'TEST', value: 'hits'},
      ]
    }
  },
  computed: {
    ...mapState({
      type: s => s.type,
      data: s => s.fetchedData
    }),

    headers() {
      switch (this.type) {
        case 'popular':
          return this.headersPopular
        case 'test':
          return this.headerPackage
        default:
          return this.headerPackage
      }
    },
    tableData() {
      switch (this.type) {
        case 'popular':
          return this.data
        case 'test':
          return this.data
        default:
          return this.data
      }

    },
  },
  methods: {
    handleClick(e) {
      console.log(e)
    }
  },
}
</script>

<style scoped>

</style>
