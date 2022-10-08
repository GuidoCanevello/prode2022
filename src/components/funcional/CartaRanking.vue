<template>
  <v-card>
    <v-container class="px-5">
      <tabla-ranking :itemsPorPagina="15" :conBuscador="true" />
    </v-container>
  </v-card>
</template>

<script>
import TablaRanking from "./TablaRanking.vue";

export default {
  components: { TablaRanking },
  name: "CartaRanking",
};
</script>