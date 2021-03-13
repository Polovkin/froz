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
        >Search
        </v-btn>
        <v-btn

            color="primary"
            elevation="8"
            medium
            @click="popular"
        >Most Popular
        </v-btn>
      </v-card-actions>
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {TYPES} from "@/types";

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
    this.$store.dispatch('FETCH_DATA', this.search)
  },
  computed: {
    ...mapState({
      error: s => s.errorMsg
    }),
    form() {
      return {
        search: this.search,
      }
    },
  },
  methods: {
    popular() {
      this.$store.dispatch('FETCH_DATA')
    },
    submit() {
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true

        this.$refs[f].validate(true)
      })

      if (!this.formHasErrors) {
        const packageName = this.search.split('@')
        this.$store.dispatch('SEARCH_PACKAGE', {name: packageName[0], type: TYPES.PACKAGE})

        if (packageName.length > 1) {
          this.$store.dispatch('SEARCH_PACKAGE_DETAILS', {name: this.search, type: TYPES.PACKAGE})
        }
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
