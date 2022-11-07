<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" v-for="nombreGrupo in grupos" :key="nombreGrupo">
        <h4>Grupo {{ nombreGrupo }}</h4>
        <v-data-table
          v-if="IS_SCREEN_BEYOND_SMALL"
          :items="getTableData(nombreGrupo)"
          :headers="headers"
          hide-default-footer
          :loading="isLoading"
          no-data-text="Sin Pronosticos Realizados"
          sort-by="fecha"
        >
          <template v-slot:[`item.code1`]="{ item }">
            <td class="text-end" style="width: 30px">
              <bandera :code="item.code1" />
            </td>
          </template>

          <template v-slot:[`item.code2`]="{ item }">
            <td class="text-start" style="width: 30px">
              <bandera :code="item.code2" />
            </td>
          </template>
        </v-data-table>

        <v-data-table
          v-else
          :items="getTableData(nombreGrupo)"
          :headers="headersMobile"
          hide-default-footer
          :loading="isLoading"
          no-data-text="Sin Pronosticos Realizados"
          sort-by="fecha"
        >
          <template v-slot:[`item.code1`]="{ item }">
            <td class="text-end" style="width: 30px">
              <bandera :code="item.code1" />
            </td>
          </template>

          <template v-slot:[`item.code2`]="{ item }">
            <td class="text-start" style="width: 30px">
              <bandera :code="item.code2" />
            </td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import Bandera from "../utilitarios/Bandera.vue";
export default {
  components: { Bandera },
  name: "PerfilFaseGrupos",
  props: ["predicciones"],
  data() {
    return {
      isLoading: false,
      grupos: ["A", "B", "C", "D", "E", "F", "G", "H"],

      headers: [
        {
          align: "start d-none d-sm-table-cell",
          value: "code1",
          sortable: false,
        },
        {
          text: "Equipo 1",
          align: "start",
          value: "equipo1",
          sortable: false,
          width: "120px",
        },
        {
          text: "Goles",
          align: "center",
          sortable: false,
          value: "goles",
          width: "1%",
        },
        {
          text: "Equipo 2",
          sortable: false,
          align: "end",
          value: "equipo2",
          width: "120px",
        },
        {
          align: "end d-none d-sm-table-cell",
          value: "code2",
          sortable: false,
        },
      ],
      headersMobile: [
        {
          text: "Equipo 1",
          align: "start",
          value: "equipo1",
          sortable: false,
          width: "120px",
        },
        {
          text: "Goles",
          align: "center",
          sortable: false,
          value: "goles",
          width: "1%",
        },
        {
          text: "Equipo 2",
          sortable: false,
          align: "end",
          value: "equipo2",
          width: "120px",
        },
      ],
    };
  },

  computed: mapGetters(["EQUIPOS", "PARTIDOS", "IS_SCREEN_BEYOND_SMALL"]),

  methods: {
    getTableData(nombreGrupo) {
      const partidosGrupo = this.PARTIDOS.filter(
        (p) =>
          p.grupo === nombreGrupo &&
          this.predicciones.find((x) => x.partidoId == p._id)
      );
      return partidosGrupo.map((p) => {
        const prediccion = this.predicciones.find((x) => x.partidoId === p._id);

        if (prediccion) {
          const equipo1 = this.EQUIPOS.find((e) => e._id === p.equipo1);
          const equipo2 = this.EQUIPOS.find((e) => e._id === p.equipo2);

          return {
            code1: equipo1.code,
            equipo1: equipo1.nombre,
            goles: `${prediccion.golesEquipo1} - ${prediccion.golesEquipo2}`,
            equipo2: equipo2.nombre,
            code2: equipo2.code,
            fecha: p.fecha,
          };
        }
      });
    },
  },
};
</script>