<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-container grid-list-xs>
            <h1>Predicciones</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <router-view />
  </v-container>
</template>

<script>
export default {
  name: "Predicciones",
  data() {
    return {
    };
  },
};
</script>
