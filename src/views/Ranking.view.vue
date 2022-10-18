<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-container fluid>
            <h1>Ranking</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-spacer />

      <v-col :cols="IS_SCREEN_BEYOND_SMALL ? 10 : 'auto'">
        <carta-ranking />
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import CartaRanking from "../components/funcional/CartaRanking.vue";

export default {
  name: "Ranking",

  components: {
    CartaRanking,
  },

  computed: mapGetters(["IS_SCREEN_BEYOND_SMALL", "IS_SCREEN_BEYOND_LARGE"]),
};
</script>
