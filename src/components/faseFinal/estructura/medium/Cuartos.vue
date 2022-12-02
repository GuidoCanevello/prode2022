<template>
  <v-col class="col-partidos" align-self="center">
    <template v-for="partido in partidos">
      <v-container v-bind:key="'cuartos' + partido.partidoId">
        <carta-partido-indiv :partido="partido"/>
      </v-container>

      <v-container
        v-if="partido.identificadorEliminatorias < 'D'"
        v-bind:key="'cuartosExtra' + partido.partidoId"
      >
        <carta-invisible />
      </v-container>
    </template>
  </v-col>
</template>

<script>
import CartaInvisible from "../../CartaInvisible.vue";
import CartaPartidoIndiv from "../../CartaPartidoIndiv.vue";
export default {
  components: { CartaPartidoIndiv, CartaInvisible },
  name: "Cuartos",
  props: ["partidos"],
  data() {
    return {    };
  },
};
</script>