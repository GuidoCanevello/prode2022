<template>
  <v-app>
    <template v-if="!['login'].includes($root._route.path.substring(1))">
      <barra-de-navegacion />
    </template>

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
  computed: mapGetters(["SHOW_ERROR"]),
  methods: {
    ...mapActions(["CHECK_LOGIN_STATUS"]),
  },
  updated() {
    if (
      !this.CHECK_LOGIN_STATUS() &&
      !["login"].includes(this.$root._route.path.substring(1))
    ) {
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>
.main-app {
  background-color: cornflowerblue;
}
</style>