<template>
  <v-row>
    <v-col sm="4">
      <carta-grupo :nombre="grupo.nombre" :equipos="grupo.equipos" />
    </v-col>

    <v-col class="pl-0">
      <carta-partidos
        :nombre="grupo.nombre"
        v-bind:partidos="grupo.partidos"
        @actualizar-prediccion="handleActualizar"
      />
    </v-col>
  </v-row>
</template>

<script>
import CartaGrupo from "./CartaGrupo.vue";
import CartaPartidos from "./CartaPartidos.vue";

export default {
  components: { CartaGrupo, CartaPartidos },
  name: "FilaGrupo",
  props: ["grupo"],
  data: () => ({}),
  methods: {
    handleActualizar(idPartido, golesEquipo1, golesEquipo2) {
      this.$emit(
        "actualizar-prediccion",
        idPartido,
        golesEquipo1,
        golesEquipo2
      );
    },
  },
};
</script>

<style scoped>
.title-grupo {
  padding: 0%;
  text-align: center;
}
</style>