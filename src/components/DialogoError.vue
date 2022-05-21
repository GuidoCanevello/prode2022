<template>
  <v-card>
    <v-card-title primary-title> ERROR </v-card-title>

    <v-card-text>
      <v-row class="row-prediccion">
        <v-col>
          <h3>
            {{ MSJ_ERROR }}
          </h3>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn color="error" text @click="handleCerrar"> Cerrar </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DialogoError",
  computed: mapGetters(["MSJ_ERROR"]),
  methods: {
    ...mapActions(["CERRAR_ERROR"]),
    handleCerrar() {
      this.CERRAR_ERROR();
    },
  },
};
</script>
