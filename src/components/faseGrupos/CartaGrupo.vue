<template>
  <v-card outlined style="height: 100%" class="d-flex flex-column">
    <v-card-title primary-title>
      <v-container class="title-grupo"> Grupo {{ nombre }} </v-container>
    </v-card-title>

    <v-spacer />

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="equipos"
        item-key="id"
        hide-default-footer
      >
        <template v-slot:[`item.bandera`]="{ item }">
          <bandera :code="item.code" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import Bandera from "../Bandera.vue";

export default {
  name: "CartaGrupo",
  components: { Bandera },
  props: ["nombre", "equipos"],
  data: () => ({
    headers: [
      {
        align: "start",
        sortable: false,
        value: "bandera",
      },
      {
        text: "Nombre",
        sortable: false,
        value: "nombre",
      },
      {
        text: "Puntos",
        sortable: false,
        align: "end",
        value: "puntos",
      },
    ],
  }),
};
</script>

<style scoped>
.title-grupo {
  padding: 0%;
  text-align: center;
}
</style>