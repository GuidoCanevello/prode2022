<template>
  <v-card outlined>
    <v-container grid-list-xs>
      <v-row> <v-col style="text-align: center"> Cargando... </v-col> </v-row>

      <v-row>
        <v-col>
          <v-btn disabled loading block />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "LoadingBar",

  data: () => ({}),
};
</script>