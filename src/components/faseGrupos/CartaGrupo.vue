<template>
  <v-card outlined style="height: 100%" class="d-flex flex-column">
    <v-card-title primary-title>
      <v-container class="title-grupo"> Grupo {{ nombre }} </v-container>
    </v-card-title>

    <v-spacer />

    <v-card-text>
      <tabla-grupo :equipos="equipos" />
    </v-card-text>
  </v-card>
</template>

<script>
import TablaGrupo from "./TablaGrupo.vue";

export default {
  name: "CartaGrupo",
  components: { TablaGrupo },
  props: ["nombre", "equipos"],
};
</script>

<style scoped>
.title-grupo {
  padding: 0%;
  text-align: center;
}
</style>