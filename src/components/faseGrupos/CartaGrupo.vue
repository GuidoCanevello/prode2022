<template>
  <v-card outlined style="height: 100%" class="d-flex flex-column">
    <v-dialog v-model="dialogGrupo">
      <carta-grupo-expandido
        v-if="dialogGrupo"
        :nombre="nombre"
        :equipos="equipos"
        v-bind:partidos="partidos"
      />
    </v-dialog>

    <v-card-title primary-title>
      <v-row>
        <v-col> Grupo {{ nombre }} </v-col>
        <v-col style="text-align: end">
          <v-btn color="info" @click="dialogGrupo = true"> Expandir </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-spacer />

    <v-card-text>
      <tabla-grupo :equipos="equipos" />
    </v-card-text>
  </v-card>
</template>

<script>
import CartaGrupoExpandido from "./CartaGrupoExpandido.vue";
import TablaGrupo from "./TablaGrupo.vue";

export default {
  name: "CartaGrupo",
  components: { TablaGrupo, CartaGrupoExpandido },
  props: ["nombre", "equipos", "partidos"],
  data() {
    return {
      dialogGrupo: false,
    };
  },
};
</script>

<style scoped>
.title-grupo {
  padding: 0%;
  text-align: center;
}
</style>