<template>
  <v-col class="col-partidos" align-self="center">
    <v-container
      class="pi-0"
      v-for="partido in partidos"
      v-bind:key="'octavos' + partido.partidoId"
    >
      <carta-partido-indiv :partido="partido" />
    </v-container>
  </v-col>
</template>

<script>
import CartaPartidoIndiv from "../../CartaPartidoIndiv.vue";
export default {
  components: { CartaPartidoIndiv },
  name: "Octavos",
  props: ["partidos"],
  data() {
    return {};
  },
};
</script>