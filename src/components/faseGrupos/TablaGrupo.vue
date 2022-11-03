<template>
  <v-data-table
    :headers="headers"
    :items="equipos"
    item-key="id"
    hide-default-footer
    mobile-breakpoint="0"
  >
    <template v-slot:[`item.bandera`]="{ item }">
      <td class="text-start" style="width: 30px">
        <bandera :code="item.code" />
      </td>
    </template>
  </v-data-table>
</template>

<script>
import Bandera from "../utilitarios/Bandera.vue";
export default {
  components: { Bandera },
  name: "TablaGrupo",
  props: ["equipos"],
  data() {
    return {
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
    };
  },
};
</script>