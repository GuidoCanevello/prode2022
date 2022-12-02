<template>
  <v-card class="card-invis" elevation="0" rounded="pill">
    <v-card-text class="pa-5">
      <h3 class="letra-invis ma-0">-</h3>
      <p class="letra-invis ma-0">-</p>
      <p class="letra-invis ma-0">-</p>
      <p class="letra-invis ma-0">-</p>
      <h3 class="letra-invis ma-0">-</h3>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CartaInvisible",
};
</script>

<style scoped>
.card-invis {
  background-color: cornflowerblue;
}

.letra-invis {
  color: cornflowerblue;
}
</style>