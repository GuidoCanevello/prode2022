<template>
  <v-container>
    <v-row :class="claseMejorJugador">
      <v-col cols="12" sm="auto">
        <h4>Mejor Jugador:</h4>
      </v-col>

      <v-col>
        {{
          mejorJugadorId == undefined ? "" : formatPlayerText(mejorJugadorId)
        }}
      </v-col>
    </v-row>

    <v-row :class="claseMejorArquero">
      <v-col cols="12" sm="auto">
        <h4>Mejor Arquero:</h4>
      </v-col>

      <v-col>
        {{
          mejorArqueroId == undefined ? "" : formatPlayerText(mejorArqueroId)
        }}
      </v-col>
    </v-row>

    <v-row :class="claseMejorGoleador">
      <v-col cols="12" sm="auto">
        <h4>Goleador:</h4>
      </v-col>

      <v-col>
        {{
          mejorGoleadorId == undefined ? "" : formatPlayerText(mejorGoleadorId)
        }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import traducirPosicion from "@/utils/traducirPosicion";

export default {
  name: "PerfilMejoresJugadores",
  props: ["mejorJugadorId", "mejorArqueroId", "mejorGoleadorId"],
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(["JUGADORES", "EQUIPOS"]),
    claseMejorJugador() {
      if (this.JUGADORES.find((j) => j._id == this.mejorJugadorId).esMejorJugador)
        return "col-prediccion-correcta";
      else return "col-prediccion-erronea";
    },

    claseMejorArquero() {
      if (this.JUGADORES.find((j) => j._id == this.mejorArqueroId).esMejorArquero)
        return "col-prediccion-correcta";
      else return "col-prediccion-erronea";
    },

    claseMejorGoleador() {
      if (this.JUGADORES.find((j) => j._id == this.mejorGoleadorId).esMejorGoleador)
        return "col-prediccion-correcta";
      else return "col-prediccion-erronea";
    },
  },
  methods: {
    formatPlayerText(playerId) {
      let jugador = this.JUGADORES.find((j) => j._id == playerId);
      let pais = this.EQUIPOS.find((e) => e._id == jugador.equipo);

      return `${pais.nombre} -> 
      ${jugador.numero} - ${jugador.nombre} - 
      ${traducirPosicion(jugador.posicion)}`;
    },
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