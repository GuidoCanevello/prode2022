<template>
  <div>
    <template v-if="isRealizarPredActivo">
      <v-dialog v-model="isRealizarPredActivo" width="1000">
        <dialogo-realizar-prediccion
          v-bind:partido="currentPartido"
          @confirmar="handleConfirmarPrediccion"
          @cancelar="handleCancelarPrediccion"
        />
      </v-dialog>
    </template>

    <template v-if="isVerPredActivo">
      <v-dialog v-model="isVerPredActivo" width="500">
        <dialogo-ver-prediccion
          v-bind:partido="currentPartido"
          @salir="handleSalirVisualizador"
        />
      </v-dialog>
    </template>

    <v-row class="mt-0">
      <v-col>
        <listado-partidos
          @realizar-prediccion="handleRealizarPrediccion"
          @ver-prediccion="handleVerPrediccion"
        />
      </v-col>
    </v-row>
    
    <v-snackbar v-model="showSnackbar" :timeout="timeoutSnackbar">
      Pronosticos Actualizados Correctamente
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="showSnackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import DialogoRealizarPrediccion from "../../components/listado/DialogoRealizarPrediccion.vue";
import DialogoVerPrediccion from "../../components/listado/DialogoVerPrediccion.vue";
import ListadoPartidos from "../../components/funcional/ListadoPartidos.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    ListadoPartidos,
    DialogoRealizarPrediccion,
    DialogoVerPrediccion,
  },
  name: "Listado",
  data: () => ({
    isRealizarPredActivo: false,
    isVerPredActivo: false,

    currentPartido: {},
    
    showSnackbar: false,
    timeoutSnackbar: 5000,
  }),

  computed: mapGetters(["IS_LOADING_FUTBOL_DATA", "DATA_LISTADO"]),

  methods: {
    ...mapActions(["MODIFICAR_PREDICCION"]),

    handleRealizarPrediccion(itemId) {
      this.isRealizarPredActivo = true;
      this.currentPartido = this.DATA_LISTADO.find(
        (p) => p.partidoId === itemId
      );
    },

    handleVerPrediccion(itemId) {
      this.isVerPredActivo = true;
      this.currentPartido = this.DATA_LISTADO.find(
        (p) => p.partidoId === itemId
      );
    },

    async handleConfirmarPrediccion(partidoId, golesEquipo1, golesEquipo2) {
      this.isRealizarPredActivo = false;
      this.currentPartido = {};
      await this.MODIFICAR_PREDICCION({ partidoId, golesEquipo1, golesEquipo2 });
      this.showSnackbar = true;
    },

    handleCancelarPrediccion() {
      this.isRealizarPredActivo = false;
      this.currentPartido = {};
    },

    handleSalirVisualizador() {
      this.isVerPredActivo = false;
      this.currentPartido = {};
    },
  },
};
</script>