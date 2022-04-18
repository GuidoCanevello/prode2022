<template>
  <v-app>
    <barra-de-navegacion />

    <v-main class="main-app">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import BarraDeNavegacion from "./components/BarraDeNavegacion.vue";
import { mapActions } from "vuex";

export default {
  components: { BarraDeNavegacion },
  name: "App",
  data() {
    return {};
  },

  methods: {
    ...mapActions(["DISPATCH_GET_INITIAL_DATA"]),
  },

  created() {
    this.DISPATCH_GET_INITIAL_DATA();
  },
};
</script>

<style scoped>
.main-app {
  background-color: cornflowerblue;
}
</style>