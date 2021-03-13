<template>
  <v-app>
    <v-app-bar
        app
        color="indigo"
        dark
    >
      Package search application
    </v-app-bar>

    <v-main>
      <Main/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Main from "@/components/Main";
import Footer from "@/components/Footer";

export default {
  name: 'App',

  components: {
    Footer,
    Main,
  },

  data: () => ({
    //
  }),
};
</script>
