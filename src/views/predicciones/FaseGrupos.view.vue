<template>
  <div>
    <template v-if="IS_LOADING_FUTBOL_DATA">
      <v-row>
        <v-col>
          <loading-bar />
        </v-col>
      </v-row>
    </template>

    <template v-else v-for="grupo in DATA_FASE_GRUPOS">
      <fila-grupo
        v-bind:key="grupo.nombre"
        v-bind:grupo="grupo"
        @actualizar-prediccion="handleActualizar"
      />
    </template>
  </div>
</template>

<script>
import FilaGrupo from "../../components/faseGrupos/FilaGrupo.vue";
import LoadingBar from "../../components/LoadingBar.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { LoadingBar, FilaGrupo },
  name: "FaseGrupos",

  data: () => ({}),

  computed: mapGetters(["IS_LOADING_FUTBOL_DATA", "DATA_FASE_GRUPOS"]),
  
  methods: {
    ...mapActions([]),
    handleActualizar(idPartido, golesEquipo1, golesEquipo2) {
      console.log("hola", idPartido, golesEquipo1, golesEquipo2);
    },
  },
};
</script>