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
          class="table-partidos"
          :item-class="fondoItem"
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
          class="table-partidos"
          :item-class="fondoItem"
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
import toResultado from "../../utils/toResultado";

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
    fondoItem(item) {
      if (
        new Date(item.fecha) < new Date() &&
        item.golesEquipo1 != undefined &&
        item.golesEquipo2 != undefined
      ) {
        if (
          item.golesEquipo1 == item.golesPrediccionEquipo1 &&
          item.golesEquipo2 == item.golesPrediccionEquipo2
        )
          return "fila-con-prediccion-correcta";
        else if (
          toResultado(
            item.golesPrediccionEquipo1,
            item.golesPrediccionEquipo2
          ) == toResultado(item.golesEquipo1, item.golesEquipo2)
        )
          return "fila-con-prediccion-acertada";
        else return "fila-con-prediccion-erronea";
      } else return "";
    },

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
            golesEquipo1: p.golesEquipo1,
            golesEquipo2: p.golesEquipo2,
            golesPrediccionEquipo1: prediccion.golesEquipo1,
            golesPrediccionEquipo2: prediccion.golesEquipo2,
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

<style scoped>
.fila-con-prediccion-correcta {
  background-color: #a5d6a7;
}

.fila-con-prediccion-acertada {
  background-color: #80cbc4;
}

.fila-con-prediccion-erronea {
  background-color: #ef9a9a;
}

.table-partidos .fila-con-prediccion-correcta:hover {
  background-color: #66bb6a !important;
}

.table-partidos .fila-con-prediccion-acertada:hover {
  background-color: #26a69a !important;
}

.table-partidos .fila-con-prediccion-erronea:hover {
  background-color: #ef5350 !important;
}
</style>