<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="auto">
        <h4>Mejor Jugador:</h4>
      </v-col>

      <v-col> {{ formatPlayerText(mejorJugadorId) }} </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="auto">
        <h4>Mejor Arquero:</h4>
      </v-col>

      <v-col> {{ formatPlayerText(mejorArqueroId) }} </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="auto">
        <h4>Mejor Goleador:</h4>
      </v-col>

      <v-col> {{ formatPlayerText(mejorGoleadorId) }} </v-col>
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
  computed: mapGetters(["JUGADORES", "EQUIPOS"]),
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