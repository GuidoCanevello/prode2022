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
      <v-col>
        <carta-ranking />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import CartaRanking from '../components/funcional/CartaRanking.vue';

export default {
  name: 'Ranking',
  
  components: {
    CartaRanking
  },  

  methods: {
    ...mapActions(["DISPATCH_GET_ALL_USERS"]),
  },

  async created() {
    await this.DISPATCH_GET_ALL_USERS();
  },
}
</script>
