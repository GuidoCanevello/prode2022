<template>
  <v-card outlined rounded="pill">
    <v-dialog v-model="showDialog" width="1000px">
      <dialogo-partido :partido="partido" />
    </v-dialog>

    <v-card-text
      class="pa-5"
      style="text-align: center"
      @click="showDialog = true"
    >
      <h3>{{ partido.nombreEquipo1 }}</h3>
      <p v-if="partido.tipoEliminatoria != 'Octavos'" class="ma-0">(Sin Prediccion)</p>
      <p v-else class="ma-0">-</p>
      <p class="ma-0">vs</p>
      <p v-if="partido.tipoEliminatoria != 'Octavos'" class="ma-0">(Sin Prediccion)</p>
      <p v-else class="ma-0">-</p>
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