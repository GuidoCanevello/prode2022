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
  </div>
</template>

<script>
import DialogoRealizarPrediccion from "../../components/listado/DialogoRealizarPrediccion.vue";
import DialogoVerPrediccion from "../../components/listado/DialogoVerPrediccion.vue";
import ListadoPartidos from "../../components/listado/ListadoPartidos.vue";
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
  }),

  methods: {
    ...mapActions([]),

    handleRealizarPrediccion(itemId) {
      this.isRealizarPredActivo = true;
      this.currentPartido = this.DATA_LISTADO.find((p) => p.idPartido === itemId);
    },

    handleVerPrediccion(itemId) {
      this.isVerPredActivo = true;
      this.currentPartido = this.DATA_LISTADO.find((p) => p.idPartido === itemId);
    },

    handleConfirmarPrediccion(idPartido, golesEquipo1, golesEquipo2) {
      this.isRealizarPredActivo = false;
      this.currentPartido = {};
      this.realizarPrediccion(idPartido, golesEquipo1, golesEquipo2);
    },

    handleCancelarPrediccion() {
      this.isRealizarPredActivo = false;
      this.currentPartido = {};
    },

    handleSalirVisualizador() {
      this.isVerPredActivo = false;
      this.currentPartido = {};
    },

    realizarPrediccion(idPartido, golesEquipo1, golesEquipo2) {
      const partidoIndex = this.DATA_LISTADO.findIndex(
        (p) => p.idPartido === idPartido
      );
      const partido = this.DATA_LISTADO[partidoIndex];
      partido.tienePrediccion = true;
      partido.prediccion = {
        golesEquipo1,
        golesEquipo2,
      };
    },
  },

  computed: mapGetters(["IS_LOADING_FUTBOL_DATA", "DATA_LISTADO"]),
};
</script>