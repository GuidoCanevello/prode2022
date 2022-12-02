<template>
  <v-col class="col-partidos" align-self="center">
    <v-container v-for="i in cantidadPartidos" v-bind:key="'octavos' + i">
      <carta-partido-indiv />
    </v-container>
  </v-col>
</template>

<script>
import CartaPartidoIndiv from "../../CartaPartidoIndiv.vue";
export default {
  components: { CartaPartidoIndiv },
  name: "OctavosSmall",
  data() {
    return {
      cantidadPartidos: [1, 2, 3, 4, 5, 6, 7, 8],
    };
  },
};
</script>