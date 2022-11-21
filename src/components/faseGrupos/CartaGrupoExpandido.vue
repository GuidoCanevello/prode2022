<template>
  <v-card>
    <v-card-title primary-title> Grupo: {{ nombre }} </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" lg="6" style="text-align: center">
          <h3>Resultados con Pronósticos</h3>
          <v-data-table
            :headers="headersPronosticos"
            :items="dataPronosticos"
            item-key="id"
            hide-default-footer
            class="table-pronosticos"
            :item-class="() => 'fila-prediccion'"
            sort-by="puntos"
            :sort-desc="true"
          >
            <template v-slot:[`item.bandera`]="{ item }">
              <td
                :class="
                  $vuetify.breakpoint.name != 'xs' ? 'text-start' : 'text-end'
                "
                style="width: 30px"
              >
                <bandera :code="item.code" />
              </td>
            </template>
          </v-data-table>
        </v-col>

        <v-col cols="12" lg="6" style="text-align: center">
          <h3>Resultados Reales</h3>
          <v-data-table
            :headers="headersReales"
            :items="dataReales"
            item-key="id"
            hide-default-footer
            sort-by="puntos"
            :sort-desc="true"
          >
            <template v-slot:[`item.bandera`]="{ item }">
              <td
                :class="
                  $vuetify.breakpoint.name != 'xs' ? 'text-start' : 'text-end'
                "
                style="width: 30px"
              >
                <bandera :code="item.code" />
              </td>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Bandera from "../utilitarios/Bandera.vue";
export default {
  components: { Bandera },
  name: "CartaGrupoExpandido",
  props: ["nombre", "equipos", "partidos"],
  data() {
    return {
      dataPronosticos: [],
      dataReales: [],

      headersPronosticos: [
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
          text: "PG",
          sortable: false,
          value: "ganados",
        },
        {
          text: "PE",
          sortable: false,
          value: "empatados",
        },
        {
          text: "PP",
          sortable: false,
          value: "perdidos",
        },
        {
          text: "GF",
          sortable: false,
          value: "golesFavor",
        },
        {
          text: "GC",
          sortable: false,
          value: "golesContra",
        },
        {
          text: "DG",
          sortable: false,
          value: "diferenciaGoles",
        },
        {
          text: "PTS",
          sortable: false,
          align: "end",
          value: "puntos",
        },
      ],

      headersReales: [
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
          text: "PJ",
          sortable: false,
          value: "jugados",
        },
        {
          text: "PG",
          sortable: false,
          value: "ganados",
        },
        {
          text: "PE",
          sortable: false,
          value: "empatados",
        },
        {
          text: "PP",
          sortable: false,
          value: "perdidos",
        },
        {
          text: "GF",
          sortable: false,
          value: "golesFavor",
        },
        {
          text: "GC",
          sortable: false,
          value: "golesContra",
        },
        {
          text: "DG",
          sortable: false,
          value: "diferenciaGoles",
        },
        {
          text: "PTS",
          sortable: false,
          align: "end",
          value: "puntos",
        },
      ],
    };
  },

  methods: {
    setTablePronosticos() {
      this.dataPronosticos = [];

      this.equipos.forEach((equipo) => {
        let newEquipo = {
          id: equipo.id,
          code: equipo.code,
          nombre: equipo.nombre,
          puntos: 0,
          ganados: 0,
          perdidos: 0,
          empatados: 0,
          golesFavor: 0,
          golesContra: 0,
          diferenciaGoles: 0,
        };

        this.dataPronosticos.push(newEquipo);
      });

      this.partidos.forEach((partido) => {
        if (partido.tienePrediccion) {
          let equipo1 = this.dataPronosticos.find(
            (e) => e.nombre == partido.equipo1
          );
          let equipo2 = this.dataPronosticos.find(
            (e) => e.nombre == partido.equipo2
          );

          equipo1.golesFavor += partido.prediccion.golesEquipo1;
          equipo1.golesContra += partido.prediccion.golesEquipo2;

          equipo2.golesFavor += partido.prediccion.golesEquipo2;
          equipo2.golesContra += partido.prediccion.golesEquipo1;

          equipo1.diferenciaGoles +=
            partido.prediccion.golesEquipo1 - partido.prediccion.golesEquipo2;
          equipo2.diferenciaGoles +=
            partido.prediccion.golesEquipo2 - partido.prediccion.golesEquipo1;

          if (
            partido.prediccion.golesEquipo1 > partido.prediccion.golesEquipo2
          ) {
            equipo1.puntos += 3;

            equipo1.ganados += 1;
            equipo2.perdidos += 1;
          } else if (
            partido.prediccion.golesEquipo2 > partido.prediccion.golesEquipo1
          ) {
            equipo1.puntos += 1;
            equipo2.puntos += 1;

            equipo2.ganados += 1;
            equipo1.perdidos += 1;
          } else {
            equipo2.puntos += 3;

            equipo1.empatados += 1;
            equipo2.empatados += 1;
          }


        }
      });
    },

    setTableReales() {
      this.dataReales = [];

      this.equipos.forEach((equipo) => {
        let newEquipo = {
          id: equipo.id,
          code: equipo.code,
          nombre: equipo.nombre,
          puntos: equipo.puntos,
          jugados: 0,
          ganados: 0,
          perdidos: 0,
          empatados: 0,
          golesFavor: 0,
          golesContra: 0,
          diferenciaGoles: 0,
        };

        this.dataReales.push(newEquipo);
      });

      this.partidos.forEach((partido) => {
        let equipo1 = this.dataReales.find((e) => e.nombre == partido.equipo1);
        let equipo2 = this.dataReales.find((e) => e.nombre == partido.equipo2);

        if (partido.fecha < new Date()) {
          equipo1.jugados += 1;
          equipo2.jugados += 1;
        }

        if (
          partido.golesEquipo1 != undefined &&
          partido.golesEquipo2 != undefined
        ) {
          equipo1.golesFavor += partido.golesEquipo1;
          equipo1.golesContra += partido.golesEquipo2;

          equipo2.golesFavor += partido.golesEquipo2;
          equipo2.golesContra += partido.golesEquipo1;

          equipo1.diferenciaGoles +=
            partido.golesEquipo1 - partido.golesEquipo2;
          equipo2.diferenciaGoles +=
            partido.golesEquipo2 - partido.golesEquipo1;

          if (partido.golesEquipo1 > partido.golesEquipo2) {
            equipo1.ganados += 1;
            equipo2.perdidos += 1;
          } else if (partido.golesEquipo2 > partido.golesEquipo1) {
            equipo2.ganados += 1;
            equipo1.perdidos += 1;
          } else {
            equipo1.empatados += 1;
            equipo2.empatados += 1;
          }
        }
      });
    },
  },

  mounted() {
    this.setTablePronosticos();
    this.setTableReales();
  },
};
</script>

<style>
.fila-prediccion {
  background-color: #e1f5fe;
}

.table-pronosticos .fila-prediccion:hover {
  background-color: #b3e5fc !important;
}
</style>