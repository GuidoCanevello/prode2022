<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-container grid-list-xs>
            <h1>Ranking</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-spacer />
      
      <v-col sm="10">
        <carta-ranking />
      </v-col>

      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import CartaRanking from "../components/funcional/CartaRanking.vue";

export default {
  name: "Ranking",

  components: {
    CartaRanking,
  },
};
</script>
