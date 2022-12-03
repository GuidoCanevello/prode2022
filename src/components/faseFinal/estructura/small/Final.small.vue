<template>
  <v-col class="col-partidos" align-self="center">
    <v-container>
      <carta-partido-indiv
        :partido="partidos.find((p) => p.tipoEliminatoria == 'Final')"
      />
    </v-container>

    <v-container>
      <carta-partido-indiv
        :partido="partidos.find((p) => p.tipoEliminatoria == 'Tercero')"
      />
    </v-container>
  </v-col>
</template>

<script>
import CartaPartidoIndiv from "../../CartaPartidoIndiv.vue";
export default {
  components: { CartaPartidoIndiv },
  name: "FinalSmall",
  props: ["partidos"],
  data() {
    return {};
  },
};
</script>