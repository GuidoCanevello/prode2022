<template>
  <v-card outlined style="height: 100%" class="d-flex flex-column">
    <v-card-title primary-title>
      <v-row>
        <v-col> Partidos de Grupo {{ nombre }}</v-col>
        <v-col style="text-align: end">
          <v-btn
            color="success"
            :loading="loadingUpdatePredicciones"
            :disabled="loadingUpdatePredicciones"
            @click="saveChanges"
            >Guardar Cambios</v-btn
          >
        </v-col>
      </v-row>
    </v-card-title>

    <v-spacer />

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="dataPartidos"
        item-key="id"
        hide-default-footer
        dense
        class="table-partidos"
        :item-class="fondoItem"
        sort-by="fecha"
      >
        <template v-slot:[`item.bandera1`]="{ item }">
          <td style="width: 16px">
            <bandera :code="item.code1" />
          </td>
        </template>

        <template v-slot:[`item.golesEquipo1`]="{ item }">
          <td style="width: 120px">
            <v-text-field
              outlined
              dense
              hide-details="auto"
              v-model="item.golesEquipo1"
            />
          </td>
        </template>

        <template v-slot:[`item.golesEquipo2`]="{ item }">
          <td style="width: 120px">
            <v-text-field
              outlined
              dense
              hide-details="auto"
              class="input-goles-2"
              v-model="item.golesEquipo2"
            />
          </td>
        </template>

        <template v-slot:[`item.bandera2`]="{ item }">
          <td style="width: 16px">
            <bandera :code="item.code2" />
          </td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Bandera from "../Bandera.vue";

export default {
  name: "CartaPartidos",
  components: { Bandera },
  props: ["nombre", "partidos"],

  data: () => ({
    dataPartidos: [],

    loadingUpdatePredicciones: false,

    headers: [
      {
        align: "start",
        sortable: false,
        value: "bandera1",
        cellClass: "cell-equipo",
      },
      {
        text: "Equipo 1",
        align: "start",
        value: "equipo1",
        cellClass: "cell-equipo",
      },
      {
        align: "center",
        sortable: false,
        value: "golesEquipo1",
      },
      {
        text: "Goles",
        align: "center",
        sortable: false,
        value: "guion",
      },
      {
        align: "center",
        sortable: false,
        value: "golesEquipo2",
      },
      {
        text: "Equipo 2",
        sortable: false,
        align: "end",
        value: "equipo2",
        cellClass: "cell-equipo",
      },
      {
        sortable: false,
        align: "end",
        value: "bandera2",
        cellClass: "cell-equipo",
      },
    ],
  }),

  methods: {
    ...mapActions(["MODIFICAR_PREDICCION"]),

    fondoItem(item) {
      return item.tienePrediccion ? "fila-con-prediccion" : "";
    },

    async saveChanges() {
      let isActualizado = false;
      let hayError = false;
      hayError = this.dataPartidos.some(
        (p) =>
          !p.tienePrediccion &&
          !this.verificarGoles(p.golesEquipo1, p.golesEquipo2)
      );

      if (!hayError) {
        this.loadingUpdatePredicciones = true;

        for (const p of this.dataPartidos) {
          if (!p.tienePrediccion && p.golesEquipo1 && p.golesEquipo2) {
            await this.MODIFICAR_PREDICCION({
              partidoId: p.partidoId,
              golesEquipo1: p.golesEquipo1,
              golesEquipo2: p.golesEquipo2,
            });
            p.tienePrediccion = true;
            isActualizado = true;
          } else if (
            p.tienePrediccion &&
            (this.PREDICCIONES.find((p2) => p2.partidoId === p.partidoId)
              .golesEquipo1 != p.golesEquipo1 ||
              this.PREDICCIONES.find((p2) => p2.partidoId === p.partidoId)
                .golesEquipo2 != p.golesEquipo2)
          ) {
            await this.MODIFICAR_PREDICCION({
              partidoId: p.partidoId,
              golesEquipo1: p.golesEquipo1,
              golesEquipo2: p.golesEquipo2,
            });
            isActualizado = true;
          }
        }

        if(isActualizado) this.$emit('prediccion-actualizada')

        this.loadingUpdatePredicciones = false;
      }
    },

    verificarGoles(gol1, gol2) {
      if (gol1 === undefined || gol2 === undefined) return true;
      else return !isNaN(gol1) && !isNaN(gol2);
    },
  },

  computed: mapGetters(["PREDICCIONES"]),

  beforeMount() {
    this.dataPartidos = [];

    this.partidos.forEach((partido) => {
      let newPartido = {
        partidoId: partido.partidoId,
        equipo1: partido.equipo1,
        code1: partido.code1,
        equipo2: partido.equipo2,
        code2: partido.code2,
        guion: "-",
        golesEquipo1: partido.tienePrediccion
          ? partido.prediccion.golesEquipo1
          : undefined,
        golesEquipo2: partido.tienePrediccion
          ? partido.prediccion.golesEquipo2
          : undefined,
        tienePrediccion: partido.tienePrediccion,
        fecha: partido.fecha
      };

      this.dataPartidos.push(newPartido);
    });
  },
};
</script>

<style>
.fila-con-prediccion {
  background-color: #e1f5fe;
}

.table-partidos .fila-con-prediccion:hover {
  background-color: #b3e5fc !important;
}

.input-goles-2 input {
  text-align: end;
}

.cell-equipo {
  width: 30%;
}
</style>