<template>
  <v-card>
    <v-container fluid :class="claseMejorJugador">
      <v-row>
        <v-col>
          <h2>Mejor Jugador</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            :disabled="!estaHabilitado"
            v-model="selectedPaisMJ"
            :items="nombresPaisesMJ"
            outlined
            label="Equipo"
            @change="handleChangePaisMJ"
            hide-details
          />
        </v-col>
        <v-col md="8">
          <v-select
            :disabled="!estaHabilitado"
            v-model="selectedJugadorMJ"
            :items="nombresJugadoresMJ"
            outlined
            hide-details
            label="Jugador"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid :class="claseMejorArquero">
      <v-row>
        <v-col>
          <h2>Mejor Arquero</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            :disabled="!estaHabilitado"
            v-model="selectedPaisMA"
            :items="nombresPaisesMA"
            outlined
            label="Equipo"
            @change="handleChangePaisMA"
            hide-details
          />
        </v-col>
        <v-col md="8">
          <v-select
            :disabled="!estaHabilitado"
            v-model="selectedJugadorMA"
            :items="nombresJugadoresMA"
            outlined
            hide-details
            label="Jugador"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid :class="claseMejorGoleador">
      <v-row>
        <v-col>
          <h2>Goleador</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-select
            :disabled="!estaHabilitado"
            v-model="selectedPaisMG"
            :items="nombresPaisesMG"
            outlined
            label="Equipo"
            @change="handleChangePaisMG"
            hide-details
          />
        </v-col>
        <v-col md="8">
          <v-select
            :disabled="!estaHabilitado"
            v-model="selectedJugadorMG"
            :items="nombresJugadoresMG"
            outlined
            hide-details
            label="Jugador"
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <v-btn
        color="success"
        @click="handleGuardarCambios"
        :loading="isLoading"
        :disabled="isLoading"
      >
        Guardar Cambios
      </v-btn>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import traducirPosicion from "@/utils/traducirPosicion";

export default {
  name: "CartaMejorJugador",

  data: () => ({
    isLoading: false,
    estaHabilitado: false,

    selectedJugadorMJ: null,
    selectedJugadorMA: null,
    selectedJugadorMG: null,

    selectedPaisMJ: null,
    selectedPaisMA: null,
    selectedPaisMG: null,

    nombresPaisesMJ: [],
    nombresJugadoresMJ: [],

    nombresPaisesMA: [],
    nombresJugadoresMA: [],

    nombresPaisesMG: [],
    nombresJugadoresMG: [],
  }),

  computed: {
    ...mapGetters([
      "EQUIPOS",
      "JUGADORES",
      "PREDICCION_MEJOR_JUGADOR",
      "PREDICCION_MEJOR_ARQUERO",
      "PREDICCION_MEJOR_GOLEADOR",
    ]),

    claseMejorJugador() {
      if (
        this.JUGADORES.find((j) => j._id == this.PREDICCION_MEJOR_JUGADOR)
          .esMejorJugador
      )
        return "col-prediccion-correcta";
      else return "col-prediccion-erronea";
    },

    claseMejorArquero() {
      if (
        this.JUGADORES.find((j) => j._id == this.PREDICCION_MEJOR_ARQUERO)
          .esMejorArquero
      )
        return "col-prediccion-correcta";
      else return "col-prediccion-erronea";
    },

    claseMejorGoleador() {
      if (
        this.JUGADORES.find((j) => j._id == this.PREDICCION_MEJOR_GOLEADOR)
          .esMejorGoleador
      )
        return "col-prediccion-correcta";
      else return "col-prediccion-erronea";
    },
  },

  methods: {
    ...mapActions(["ACTUALIZAR_PREDICCION_JUGADORES"]),

    setInitialData() {
      if (!this.IS_LOADING_FUTBOL_DATA && this.nombresPaisesMJ.length == 0) {
        this.nombresPaisesMJ = this.EQUIPOS.map((e) => e.nombre).sort(
          (a, b) => a > b
        );

        if (this.PREDICCION_MEJOR_JUGADOR) {
          this.selectedJugadorMJ = this.JUGADORES.find(
            (j) => j._id == this.PREDICCION_MEJOR_JUGADOR
          );
          this.selectedPaisMJ = this.EQUIPOS.find(
            (e) => e._id == this.selectedJugadorMJ.equipo
          ).nombre;

          this.nombresJugadoresMJ = this.crearArregloJugadores(
            this.selectedPaisMJ,
            false
          );
        }

        this.nombresPaisesMA = this.EQUIPOS.map((e) => e.nombre).sort(
          (a, b) => a > b
        );

        if (this.PREDICCION_MEJOR_ARQUERO) {
          this.selectedJugadorMA = this.JUGADORES.find(
            (j) => j._id == this.PREDICCION_MEJOR_ARQUERO
          );
          this.selectedPaisMA = this.EQUIPOS.find(
            (e) => e._id == this.selectedJugadorMA.equipo
          ).nombre;

          this.nombresJugadoresMA = this.crearArregloJugadores(
            this.selectedPaisMA,
            true
          );
        }

        this.nombresPaisesMG = this.EQUIPOS.map((e) => e.nombre).sort(
          (a, b) => a > b
        );

        if (this.PREDICCION_MEJOR_GOLEADOR) {
          this.selectedJugadorMG = this.JUGADORES.find(
            (j) => j._id == this.PREDICCION_MEJOR_GOLEADOR
          );
          this.selectedPaisMG = this.EQUIPOS.find(
            (e) => e._id == this.selectedJugadorMG.equipo
          ).nombre;

          this.nombresJugadoresMG = this.crearArregloJugadores(
            this.selectedPaisMG,
            false
          );
        }
      }
    },

    async handleGuardarCambios() {
      this.isLoading = true;

      await this.ACTUALIZAR_PREDICCION_JUGADORES({
        prediccionMejorJugador: this.selectedJugadorMJ._id,
        prediccionMejorArquero: this.selectedJugadorMA._id,
        prediccionMejorGoleador: this.selectedJugadorMG._id,
      });

      this.isLoading = false;
    },

    handleChangePaisMJ(pais) {
      this.nombresJugadoresMJ = this.crearArregloJugadores(pais, false);
    },

    handleChangePaisMA(pais) {
      this.nombresJugadoresMA = this.crearArregloJugadores(pais, true);
    },

    handleChangePaisMG(pais) {
      this.nombresJugadoresMG = this.crearArregloJugadores(pais, false);
    },

    crearArregloJugadores(pais, esArqueros) {
      const equipo = this.EQUIPOS.find((e) => e.nombre == pais);
      let arregloJugadores = this.JUGADORES.filter(
        (j) =>
          j.equipo == equipo._id &&
          (esArqueros ? j.posicion == "Goalkeeper" : true)
      )
        .sort((a, b) => a.numero > b.numero)
        .map((j) => {
          return {
            value: j,
            text:
              (this.$vuetify.breakpoint.name != "xs" ? `${j.numero} - ` : "") +
              `${j.nombre} - ${traducirPosicion(j.posicion)}`,
          };
        });
      return arregloJugadores;
    },
  },

  mounted() {
    this.setInitialData();
  },
};
</script>

<style scoped>
.col-prediccion-correcta {
  background-color: #a5d6a7;
}

.col-prediccion-erronea {
  background-color: #ef9a9a;
}
</style>