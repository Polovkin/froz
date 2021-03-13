<template>
  <v-footer
      dark
      padless
  >
    <v-card
        flat
        fluid
        tile
        class="indigo white--text text-center width"
    >
      <v-card-text>
        <v-btn
            v-for="item in links"
            :key="item"
            class="mx-4 white--text"
            icon
        >
          <v-btn :href="item.link">
            <v-icon  size="24px">
              {{ item.icon }}
            </v-icon>
          </v-btn>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Test. Mikle Zhuravlov
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    links: [
      {
        icon: 'mdi-git', link: 'https://github.com/Polovkin/froz',
      },
      {
        icon: 'mdi-linkedin', link: 'https://www.linkedin.com/in/mikle-polovkin/',
      }
    ],
  }),
}
</script>

<style scoped>
.width {
  width: 100%;
}
</style>
