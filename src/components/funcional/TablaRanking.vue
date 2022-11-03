<template>
  <v-data-table
    :headers="headers"
    :items="DATA_RANKING"
    item-key="id"
    :items-per-page="itemsPorPagina"
    :search="conBuscador ? busqueda : null"
    :custom-filter="conBuscador ? filtrarUsuario : null"
    :loading="IS_LOADING_USERS_DATA"
    loading-text="Cargando Jugadores..."
    :sort-by="conBuscador ? 'posicion' : null"
    class="table-ranking"
    :item-class="fondoItem"
    mobile-breakpoint="0"
  >
    <template v-if="conBuscador" v-slot:top>
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Ranking",

  props: ["itemsPorPagina", "conBuscador"],

  data: () => ({
    busqueda: "",
  }),

  computed: {
    ...mapGetters(["IS_LOADING_USERS_DATA", "DATA_RANKING"]),
    headers() {
      return [
        {
          align: "start d-none d-md-table-cell",
          value: "posicion",
          filterable: false,
          sortable: this.conBuscador,
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
          sortable: this.conBuscador,
        },
        {
          text: "Puntos",
          align: "end",
          value: "puntos",
          sortable: false,
        },
      ];
    },
  },

  methods: {
    ...mapActions(["DISPATCH_GET_ALL_USERS"]),

    filtrarUsuario(value, busqueda, item) {
      let usuarios = value ? value.toString().toLocaleUpperCase() : "";
      let busquedaAux = busqueda ? busqueda.toLocaleUpperCase() : "";
      return (
        usuarios != "" && busqueda != "" && usuarios.indexOf(busquedaAux) !== -1
      );
    },

    fondoItem(item) {
      switch (item.posicion) {
        case 1:
          return "fila-primero";
        case 2:
          return "fila-segundo";
        case 3:
          return "fila-tercero";
        default:
          return "";
      }
    },
  },

  async created() {
    await this.DISPATCH_GET_ALL_USERS();
  },
};
</script>

<style>
.fila-primero {
  background-color: #fff59d;
}

.table-ranking .fila-primero:hover {
  background-color: #ffee58 !important;
}

.fila-segundo {
  background-color: #cfd8dc;
}

.table-ranking .fila-segundo:hover {
  background-color: #90a4ae !important;
}

.fila-tercero {
  background-color: #ffe0b2;
}

.table-ranking .fila-tercero:hover {
  background-color: #ffb74d !important;
}
</style>