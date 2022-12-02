<template>
  <v-col class="col-partidos" align-self="center">
    <v-container>
      <carta-partido-indiv />
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
      <carta-partido-indiv />
    </v-container>
  </v-col>
</template>

<script>
import CartaInvisible from '../../CartaInvisible.vue';
import CartaPartidoIndiv from "../../CartaPartidoIndiv.vue";
export default {
  components: { CartaPartidoIndiv, CartaInvisible },
  name: "Semifinales",
  data() {
    return {};
  },
};
</script>