<template>
  <v-col class="col-partidos" align-self="center">
    <v-container
      v-for="partido in partidos"
      v-bind:key="'semifinales' + partido.partidoId"
    >
      <carta-partido-indiv :partido="partido" />
    </v-container>
  </v-col>
</template>

<script>
import CartaPartidoIndiv from "../../CartaPartidoIndiv.vue";
export default {
  components: { CartaPartidoIndiv },
  name: "SemifinalesSmall",
  props: ["partidos"],
  data() {
    return {};
  },
};
</script>