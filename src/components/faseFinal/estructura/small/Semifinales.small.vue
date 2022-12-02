<template>
  <v-col class="col-partidos" align-self="center">
    <v-container v-for="i in cantidadPartidos" v-bind:key="'semis' + i">
      <carta-partido-indiv />
    </v-container>
  </v-col>
</template>

<script>
import CartaPartidoIndiv from "../../CartaPartidoIndiv.vue";
export default {
  components: { CartaPartidoIndiv },
  name: "SemifinalesSmall",
  data() {
    return {
      cantidadPartidos: [1, 2],
    };
  },
};
</script>