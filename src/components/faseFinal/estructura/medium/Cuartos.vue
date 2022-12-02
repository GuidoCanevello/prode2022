<template>
  <v-col class="col-partidos" align-self="center">
    <template v-for="i in cantidadPartidos">
      <v-container v-bind:key="'cuartos' + i">
        <carta-partido-indiv />
      </v-container>

      <v-container
        v-if="i < cantidadPartidos.length"
        v-bind:key="'cuartos' + i + cantidadPartidos.length"
      >
        <carta-invisible />
      </v-container>
    </template>
  </v-col>
</template>

<script>
import CartaInvisible from '../../CartaInvisible.vue';
import CartaPartidoIndiv from "../../CartaPartidoIndiv.vue";
export default {
  components: { CartaPartidoIndiv, CartaInvisible },
  name: "Cuartos",
  data() {
    return {
      cantidadPartidos: [1, 2, 3, 4],
    };
  },
};
</script>