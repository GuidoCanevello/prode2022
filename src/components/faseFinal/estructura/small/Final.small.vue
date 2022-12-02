<template>
  <v-col class="col-partidos" align-self="center">
    <v-container>
      <carta-partido-indiv />
    </v-container>

    <v-container>
      <carta-partido-indiv />
    </v-container>
  </v-col>
</template>

<script>
import CartaPartidoIndiv from "../../CartaPartidoIndiv.vue";
export default {
  components: { CartaPartidoIndiv },
  name: "FinalSmall",
  data() {
    return {};
  },
};
</script>