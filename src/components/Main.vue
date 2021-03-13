<template>
  <v-container>
    <Search/>
    <Results/>
  </v-container>
</template>

<script>
import Search from "@/components/Search";
import Results from "@/components/Results";

export default {
  name: 'Main',
  components: {Results, Search},
  data: () => ({}),
}
</script>
