<template>
  <div class="app__search">

    <div ref="form">
      <v-card-text>
        <v-text-field
            ref="search"
            v-model="search"
            :rules="[rules.required]"
            label="Package name"
            required
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn

            color="primary"
            elevation="8"
            medium
            @click="submit"
        >Search</v-btn>
      </v-card-actions>
    </div>

  </div>
</template>

<script>
export default {
  search: "Search",
  data() {
    return {
      search: '',
      formHasErrors: false,
      rules: {
        required: value => !!value || 'Required.',
      },
    }
  },
  mounted() {
    this.$store.dispatch('FETCH_DATA',this.search)
  },
  computed: {
    form() {
      return {
        search: this.search,
      }
    },
  },
  methods: {
    submit() {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })

      if (!this.formHasErrors) {
        this.$store.dispatch('SEARCH_PACKAGE',this.search)
      }
    },
  },
}
</script>

<style lang="scss">
.app {
  &__button {
    margin-top: 1rem;
  }
}

</style>
