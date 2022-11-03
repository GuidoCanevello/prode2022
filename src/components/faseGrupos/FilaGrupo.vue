<template>
  <v-row v-if="IS_SCREEN_BEYOND_MEDIUM">
    <v-col sm="4">
      <carta-grupo :nombre="grupo.nombre" :equipos="grupo.equipos" />
    </v-col>

    <v-col class="pl-0">
      <carta-partidos
        :nombre="grupo.nombre"
        v-bind:partidos="grupo.partidos"
        @prediccion-actualizada="$emit('prediccion-actualizada')"
      />
    </v-col>
  </v-row>

  <v-row v-else>
    <v-col>
      <carta-partidos-small
        :nombre="grupo.nombre"
        :equipos="grupo.equipos" 
        v-bind:partidos="grupo.partidos"
        @prediccion-actualizada="$emit('prediccion-actualizada')"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex';
import CartaGrupo from "./CartaGrupo.vue";
import CartaPartidos from "./CartaPartidos.vue";
import CartaPartidosSmall from './CartaPartidos.small.vue';

export default {
  components: { CartaGrupo, CartaPartidos, CartaPartidosSmall },
  name: "FilaGrupo",
  props: ["grupo"],
  computed: mapGetters(["IS_SCREEN_BEYOND_MEDIUM"]),
};
</script>

<style scoped>
.title-grupo {
  padding: 0%;
  text-align: center;
}
</style>