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
          >
            Guardar Cambios
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-spacer />

    <v-card-text>
      <v-alert type="error" :value="showAlert">
        Solo se permiten Numeros
      </v-alert>

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
        <template v-slot:[`item.equipo1`]="{ item }">
          <td style="width: 160px">
            <v-row>
              <v-col class="pr-0" cols="auto">
                <bandera :code="item.code1" />
              </v-col>
              <v-col>
                {{ item.equipo1 }}
              </v-col>
            </v-row>
          </td>
        </template>

        <template v-slot:[`item.golesPrediccionEquipo1`]="{ item }">
          <td class="px-0" style="width: 120px">
            <v-text-field
              :outlined="validarFecha(item.fecha)"
              :filled="!validarFecha(item.fecha)"
              dense
              hide-details="auto"
              :disabled="!validarFecha(item.fecha)"
              v-model="item.golesPrediccionEquipo1"
              :placeholder="validarFecha(item.fecha) ? 'Ej: 0' : 'X'"
            />
          </td>
        </template>

        <template v-slot:[`item.golesPrediccionEquipo2`]="{ item }">
          <td class="px-0" style="width: 120px">
            <v-text-field
              :outlined="validarFecha(item.fecha)"
              :filled="!validarFecha(item.fecha)"
              dense
              hide-details="auto"
              class="input-goles-2"
              :disabled="!validarFecha(item.fecha)"
              v-model="item.golesPrediccionEquipo2"
              :placeholder="validarFecha(item.fecha) ? 'Ej: 0' : 'X'"
            />
          </td>
        </template>

        <template v-slot:[`item.equipo2`]="{ item }">
          <td style="width: 160px">
            <v-row>
              <v-col style="text-align: end">
                {{ item.equipo2 }}
              </v-col>
              <v-col class="pl-0" cols="auto" style="text-align: end">
                <bandera :code="item.code2" />
              </v-col>
            </v-row>
          </td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Bandera from "../utilitarios/Bandera.vue";

export default {
  name: "CartaPartidos",
  components: { Bandera },
  props: ["nombre", "partidos"],

  data: () => ({
    dataPartidos: [],

    loadingUpdatePredicciones: false,
    showAlert: false,

    headers: [
      {
        text: "Equipo 1",
        align: "start",
        value: "equipo1",
        sortable: false,
      },
      {
        align: "center",
        sortable: false,
        value: "golesPrediccionEquipo1",
      },
      {
        text: "Goles",
        align: "center",
        sortable: false,
        value: "guion",
        width: "1%",
      },
      {
        align: "center",
        sortable: false,
        value: "golesPrediccionEquipo2",
      },
      {
        text: "Equipo 2",
        sortable: false,
        align: "end",
        value: "equipo2",
      },
    ],
  }),

  methods: {
    ...mapActions(["MODIFICAR_PREDICCION"]),

    fondoItem(item) {
      return item.tienePrediccion ? "fila-con-prediccion" : "";
    },

    async saveChanges() {
      this.showAlert = false;

      let isActualizado = false;
      let hayError = this.dataPartidos.some(
        (p) =>
          !this.verificarGoles(
            p.golesPrediccionEquipo1,
            p.golesPrediccionEquipo2
          )
      );

      if (!hayError) {
        this.loadingUpdatePredicciones = true;
        for (const p of this.dataPartidos) {
          if (
            !p.tienePrediccion &&
            p.golesPrediccionEquipo1 &&
            p.golesPrediccionEquipo2
          ) {
            await this.MODIFICAR_PREDICCION({
              partidoId: p.partidoId,
              golesEquipo1: p.golesPrediccionEquipo1,
              golesEquipo2: p.golesPrediccionEquipo2,
            });
            p.tienePrediccion = true;
            isActualizado = true;
          } else if (
            p.tienePrediccion &&
            (this.PREDICCIONES.find((p2) => p2.partidoId === p.partidoId)
              .golesPrediccionEquipo1 != p.golesPrediccionEquipo1 ||
              this.PREDICCIONES.find((p2) => p2.partidoId === p.partidoId)
                .golesPrediccionEquipo2 != p.golesPrediccionEquipo2)
          ) {
            await this.MODIFICAR_PREDICCION({
              partidoId: p.partidoId,
              golesEquipo1: p.golesPrediccionEquipo1,
              golesEquipo2: p.golesPrediccionEquipo2,
            });
            isActualizado = true;
          }
        }
        if (isActualizado) this.$emit("prediccion-actualizada");
        this.loadingUpdatePredicciones = false;
      } else {
        this.showAlert = true;
      }
    },

    verificarGoles(gol1, gol2) {
      if (gol1 === undefined || gol2 === undefined) return true;
      else return !isNaN(gol1) && !isNaN(gol2);
    },

    validarFecha(fecha) {
      // True si la fecha es mayor estricto que la fecha a validar
      let fechaAValidar = new Date();
      return fecha > fechaAValidar;
    }
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
        guion: partido.golesEquipo1
          ? `${partido.golesEquipo1} - ${partido.golesEquipo2}`
          : "N - N",
        golesPrediccionEquipo1: partido.tienePrediccion
          ? partido.prediccion.golesEquipo1
          : undefined,
        golesPrediccionEquipo2: partido.tienePrediccion
          ? partido.prediccion.golesEquipo2
          : undefined,
        tienePrediccion: partido.tienePrediccion,
        fecha: partido.fecha,
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
</style>