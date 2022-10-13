<template>
  <v-card>
    <v-card-title primary-title>
      <v-row>
        <v-col> Ranking </v-col>
        <v-col cols="auto" style="text-align: end">
          <v-btn color="success" @click="handleIrARanking">Ir al Ranking</v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <tabla-ranking :itemsPorPagina="5" :conBuscador="false" />
    </v-card-text>
  </v-card>
</template>

<script>
import TablaRanking from "./TablaRanking.vue";

export default {
  components: { TablaRanking },
  name: "MiniCartaRanking",

  methods: {
    handleIrARanking() {
      this.$router.push("/ranking");
    },
  },
};
</script>