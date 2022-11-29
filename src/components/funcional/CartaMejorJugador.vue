<template>
  <v-card>
    <v-container fluid>
      <v-row>
        <v-col>
          <h2>Mejor Jugador</h2>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4">
          <v-autocomplete
            v-model="selectedPaisMJ"
            :items="nombresPaisesMJ"
            filled
            label="Equipo"
            @change="
              () => {
                console.log('cambioEquipo');
              }
            "
          />
        </v-col>
        <v-col md="8">
          <v-autocomplete
            v-model="selectedJugadorMJ"
            :items="nombresJugadoresMJ"
            filled
            label="Jugador"
            @change="
              () => {
                console.log('cambioJugador');
              }
            "
          />
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid>
      <h2>Mejor Arquero</h2>
    </v-container>

    <v-container fluid>
      <h2>Mejor Goleador</h2>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "CartaMejorJugador",

  data: () => ({
    selectedPaisMJ: "",
    selectedJugadorMJ: "",
    nombresPaisesMJ: [],
    nombresJugadoresMJ: [],
  }),
  
  mounted() {
    
  },
};
</script>