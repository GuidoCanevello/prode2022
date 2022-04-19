<template>
  <v-app>
    <barra-de-navegacion />

    <template v-if="SHOW_ERROR">
      <v-dialog v-model="SHOW_ERROR" width="500">
        <dialogo-error />
      </v-dialog>
    </template>

    <v-main class="main-app">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import BarraDeNavegacion from "./components/BarraDeNavegacion.vue";
import DialogoError from "./components/DialogoError.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { BarraDeNavegacion, DialogoError },
  name: "App",
  methods: {
    ...mapActions(["DISPATCH_GET_INITIAL_DATA"]),
  },
  created() {
    this.DISPATCH_GET_INITIAL_DATA();
  },
  computed: mapGetters(["SHOW_ERROR"]),
};
</script>

<style scoped>
.main-app {
  background-color: cornflowerblue;
}
</style>