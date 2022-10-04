<template>
  <v-card>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="DATA_RANKING"
        item-key="id"
        :items-per-page="15"
        :search="busqueda"
        :custom-filter="filtrarUsuario"
        :loading="IS_LOADING_USERS_DATA"
        loading-text="Cargando Jugadores..."
      >
        <template v-slot:top>
          <v-text-field
            v-model="busqueda"
            label="Buscar por Nombre"
            class="mx-4"
          ></v-text-field>
        </template>

        <template v-slot:[`item.iconoJugador`]="{ item }">
          <v-avatar v-if="item.iconoJugador != ''" size="32">
            <img :src="item.iconoJugador" />
          </v-avatar>

          <v-avatar v-else color="blue lighten-1" size="32">
            {{ item.nombreJugador.substring(0, 1) }}
          </v-avatar>
        </template>
      </v-data-table>
    </v-container>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CartaRanking",

  data: () => ({
    busqueda: "",

    headers: [
      {
        align: "start",
        filterable: false,
        value: "posicion",
        width: "1%",
      },
      {
        text: "Icono",
        align: "start",
        value: "iconoJugador",
        sortable: false,
        width: "1%",
      },
      {
        text: "Nombre",
        align: "start",
        value: "nombreJugador",
      },
      {
        text: "Puntos",
        align: "end",
        value: "puntos",
        sortable: false,
      },
    ],
  }),

  computed: mapGetters(["IS_LOADING_USERS_DATA", "DATA_RANKING"]),

  methods: {
    filtrarUsuario(value, busqueda, item) {
      let usuarios = value ? value.toString().toLocaleUpperCase() : "";
      let busquedaAux = busqueda ? busqueda.toLocaleUpperCase() : "";
      return (
        usuarios != "" && busqueda != "" && usuarios.indexOf(busquedaAux) !== -1
      );
    },
  },
};
</script>