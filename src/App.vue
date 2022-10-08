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

    <v-main
      v-if="IS_LOGGED || ['login'].includes($root._route.path.substring(1))"
      class="main-app"
    >
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import BarraDeNavegacion from "./components/funcional/BarraDeNavegacion.vue";
import DialogoError from "./components/utilitarios/DialogoError.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: { BarraDeNavegacion, DialogoError },
  name: "App",
  computed: mapGetters(["IS_LOGGED", "IS_LOADING_LOGIN", "SHOW_ERROR"]),
  methods: {
    ...mapActions(["CHECK_LOGIN_STATUS", "DISPATCH_GET_INITIAL_DATA"]),
  },

  beforeUpdate() {
    // Check Login status before every update
    if (
      !this.IS_LOGGED &&
      !this.IS_LOADING_LOGIN &&
      !["login"].includes(this.$root._route.path.substring(1))
    ) {
      this.$router.push("/login");
    }
  },

  async created() {
    // Check Login status before starting the page
    await this.CHECK_LOGIN_STATUS();
    if (
      !this.IS_LOGGED &&
      !["login"].includes(this.$root._route.path.substring(1))
    ) {
      this.$router.push("/login");
    } else if (this.IS_LOGGED) {
      this.DISPATCH_GET_INITIAL_DATA();
    }
  },
};
</script>

<style scoped>
.main-app {
  background-color: cornflowerblue;
}
</style>