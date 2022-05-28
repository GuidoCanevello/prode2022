<template>
  <v-card outlined>
    <v-card-title primary-title>
      {{ USUARIO_NOMBRE_JUGADOR }}
    </v-card-title>
    <v-card-subtitle>
      Puntos: {{ USUARIO_PUNTOS }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "UserBox",

  data: () => ({}),
  computed: mapGetters(["USUARIO_NOMBRE_JUGADOR", "USUARIO_PUNTOS"]),
};
</script>
