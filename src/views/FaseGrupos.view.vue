<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-container>
            <h1>Fase de Grupos</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

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
        @prediccion-actualizada="showSnackbar = true"
      />
    </template>

    <v-snackbar v-model="showSnackbar" :timeout="timeoutSnackbar">
      Predicciones Actualizadas Correctamente
      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="showSnackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import FilaGrupo from "@/components/faseGrupos/FilaGrupo.vue";
import LoadingBar from "@/components/LoadingBar.vue";
import { mapGetters } from "vuex";

export default {
  name: "FaseGrupos",
  components: { LoadingBar, FilaGrupo },

  data: () => ({
    showSnackbar: false,
    timeoutSnackbar: 1500,
  }),

  computed: mapGetters(["IS_LOADING_FUTBOL_DATA", "DATA_FASE_GRUPOS"]),
};
</script>