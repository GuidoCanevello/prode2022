<template>
  <v-col class="col-partidos" align-self="center">
    <v-container>
      <carta-partido-indiv :partido="partidos.find(p => p.identificadorEliminatorias == 'X')"/>
    </v-container>

    <v-container>
      <carta-invisible />
    </v-container>

    <v-container>
      <carta-invisible />
    </v-container>

    <v-container>
      <carta-invisible />
    </v-container>

    <v-container>
      <carta-partido-indiv :partido="partidos.find(p => p.identificadorEliminatorias == 'Y')"/>
    </v-container>
  </v-col>
</template>

<script>
import CartaInvisible from '../../CartaInvisible.vue';
import CartaPartidoIndiv from "../../CartaPartidoIndiv.vue";
export default {
  components: { CartaPartidoIndiv, CartaInvisible },
  name: "Semifinales",
  props: ["partidos"],
  data() {
    return {};
  },
};
</script>