<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-container grid-list-xs>
            <h1>Ventana de Admin</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-0">
      <v-col>
        <main-window />
      </v-col>
    </v-row>
  </v-container>  
</template>

<script>
import MainWindow from "../components/adminWindow/MainWindow.vue";
export default {
  name: "AdminWindow",
  components: {
    MainWindow,
  },
};
</script>