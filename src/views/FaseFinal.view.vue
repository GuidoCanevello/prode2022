<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-container fluid>
            <h1>Fase Final</h1>
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

    <template v-else>
      <v-row class="mt-0">
        <v-col v-if="IS_SCREEN_BEYOND_MEDIUM">
          <carta-completa />
        </v-col>

        <v-col v-else>
          <carta-completa-small />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import CartaCompletaSmall from "../components/faseFinal/CartaCompleta.small.vue";
import CartaCompleta from "../components/faseFinal/CartaCompleta.vue";
import LoadingBar from '../components/utilitarios/LoadingBar.vue';
import SitioBajoConstruccion from "../components/utilitarios/SitioBajoConstruccion.vue";
export default {
  name: "FaseFinal",
  components: { SitioBajoConstruccion, CartaCompleta, CartaCompletaSmall, LoadingBar },

  data: () => ({}),

  computed: mapGetters(["IS_SCREEN_BEYOND_MEDIUM", "IS_LOADING_FUTBOL_DATA"]),
};
</script>