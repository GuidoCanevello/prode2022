<template>
  <v-card outlined :loading="!HAS_INITIAL_DATA">
    <template v-if="showConfig">
      <v-dialog v-model="showConfig" width="500">
        <dialogo-user-data @cerrar="showConfig = false" />
      </v-dialog>
    </template>

    <v-row>
      <v-col sm="7">
        <v-container v-if="HAS_INITIAL_DATA">
          <v-list-item-title class="text-h5 mb-0">
            {{ USUARIO_NOMBRE_JUGADOR }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Puntos: {{ USUARIO_PUNTOS }}
          </v-list-item-subtitle>
        </v-container>
      </v-col>

      <v-col sm="5" style="text-align: center">
        <v-container @click="handleEdit">
          <v-badge bordered overlap style="cursor: pointer">
            <template v-if="HAS_INITIAL_DATA" v-slot:badge>
              <v-icon class="custom-icon" >mdi-pencil</v-icon>
            </template>
            <v-avatar v-if="USUARIO_IMAGEN_SRC">
              <img :src="USUARIO_IMAGEN_SRC" alt="perfil" />
            </v-avatar>

            <v-avatar v-else color="blue lighten-1">
              {{ USUARIO_NOMBRE_JUGADOR.substring(0, 1) }}
            </v-avatar>
          </v-badge>
        </v-container>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import DialogoUserData from "./DialogoUserData.vue";

export default {
  name: "UserBox",
  components: { DialogoUserData },

  data: () => ({
    showConfig: false,
  }),

  methods: {
    handleEdit() {
      this.showConfig = true;
    },
  },

  computed: mapGetters([
    "USUARIO_NOMBRE_JUGADOR",
    "USUARIO_PUNTOS",
    "USUARIO_IMAGEN_SRC",
    "HAS_INITIAL_DATA",
  ]),
};
</script>

<style scoped>
.custom-icon {
  color: white !important;
  font-size: 12px !important;
}
</style>
