<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card :loading="IS_LOADING_FUTBOL_DATA">
          <v-container fluid>
            <h1>Voto de MVP</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col v-if="!IS_LOADING_FUTBOL_DATA">
        <carta-mejor-jugador />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import CartaMejorJugador from "../components/funcional/CartaMejorJugador.vue";

export default {
  name: "MVP",
  components: { CartaMejorJugador },

  data: () => ({}),

  computed: mapGetters(["IS_LOADING_FUTBOL_DATA"]),
};
</script>