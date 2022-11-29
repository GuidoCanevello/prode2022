<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-container fluid>
            <h1>Voto de MVP</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col>
        <carta-mejor-jugador />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CartaMejorJugador from '../components/funcional/CartaMejorJugador.vue';

export default {
  name: "MVP",
  components: { CartaMejorJugador },

  data: () => ({}),
};
</script>