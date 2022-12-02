<template>
  <v-card outlined rounded="pill">
    <v-dialog v-model="showDialog" width="1000px">
      <dialogo-partido />
    </v-dialog>

    <v-card-text
      class="pa-5"
      style="text-align: center"
      @click="showDialog = true"
    >
      <h3>{{ partido.nombreEquipo1 }}</h3>
      <p class="ma-0">(Gales)</p>
      <p class="ma-0">vs</p>
      <p class="ma-0">(Sin Prediccion)</p>
      <h3>{{ partido.nombreEquipo2 }}</h3>
    </v-card-text>
  </v-card>
</template>

<script>
import DialogoPartido from "./DialogoPartido.vue";
export default {
  components: { DialogoPartido },
  name: "CartaPartidoIndiv",
  props: ["partido"],
  data() {
    return {
      showDialog: false,
    };
  },
};
</script>

<style scoped>
.v-card:hover {
  cursor: pointer;
  background-color: #e0e0e0 !important;
}
</style>