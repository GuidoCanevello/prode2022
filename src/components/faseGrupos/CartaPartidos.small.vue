<template>
  <v-card outlined style="height: 100%" class="d-flex flex-column">
    <v-card-title primary-title> Partidos de Grupo {{ nombre }} </v-card-title>

    <v-card-text :class="IS_SCREEN_BEYOND_SMALL ? '' : 'px-4'">
      <v-row>
        <!-- TODO reemplazar x btn para ir a ventana de expansion -->
        <v-col>
          <v-expansion-panels hover>
            <v-expansion-panel>
              <v-expansion-panel-header>
                Tabla de Puntos
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <tabla-grupo :equipos="equipos" />
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="px-2">
          <v-data-table
            :headers="headers"
            :items="dataPartidos"
            item-key="id"
            hide-default-footer
            :dense="IS_SCREEN_BEYOND_SMALL"
            class="table-partidos"
            :item-class="fondoItem"
            sort-by="fecha"
            mobile-breakpoint="0"
          >
            <template
              v-if="$vuetify.breakpoint.name === 'sm'"
              v-slot:[`item.equipo1`]="{ item }"
            >
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

            <template
              v-if="$vuetify.breakpoint.name === 'sm'"
              v-slot:[`item.golesPrediccionEquipo1`]="{ item }"
            >
              <td class="px-0" style="width: 60px">
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

            <template
              v-if="$vuetify.breakpoint.name === 'sm'"
              v-slot:[`item.golesPrediccionEquipo2`]="{ item }"
            >
              <td class="px-0" style="width: 60px">
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

            <template
              v-if="$vuetify.breakpoint.name === 'sm'"
              v-slot:[`item.equipo2`]="{ item }"
            >
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

            <template
              v-if="$vuetify.breakpoint.name === 'xs'"
              v-slot:item="{ item }"
            >
              <tr :class="fondoItem(item)">
                <td class="pr-0 py-3" style="width: 200px">
                  <v-row>
                    <v-col class="pr-0" cols="auto">
                      <bandera :code="item.code1" />
                    </v-col>
                    <v-col class="px-1">
                      {{ item.equipo1 }}
                    </v-col>
                  </v-row>

                  <v-spacer />

                  <v-row>
                    <v-col class="pl-1 pr-0" cols="auto" style="width: 100px">
                      <v-text-field
                        :outlined="validarFecha(item.fecha)"
                        :filled="!validarFecha(item.fecha)"
                        dense
                        hide-details="auto"
                        :disabled="!validarFecha(item.fecha)"
                        v-model="item.golesPrediccionEquipo1"
                        :placeholder="validarFecha(item.fecha) ? 'Ej: 0' : 'X'"
                        type="number"
                      />
                    </v-col>
                    <v-spacer />
                  </v-row>
                </td>

                <td class="px-0 py-3" />

                <td class="px-0">
                  <v-row class="py-3" style="height: 98px">
                    <v-col
                      class="px-0"
                      style="text-align: center"
                      align-self="end"
                    >
                      {{ item.guion }}
                    </v-col>
                  </v-row>
                </td>

                <td class="px-0 py-3" />

                <td class="pl-0 py-3" style="width: 200px">
                  <v-row>
                    <v-col class="px-1" style="text-align: end">
                      {{ item.equipo2 }}
                    </v-col>
                    <v-col class="pl-0" cols="auto" style="text-align: end">
                      <bandera :code="item.code2" />
                    </v-col>
                  </v-row>

                  <v-spacer />

                  <v-row>
                    <v-spacer />
                    <v-col
                      class="pl-0 pr-1"
                      cols="auto"
                      style="text-align: end; width: 100px"
                    >
                      <v-text-field
                        :outlined="validarFecha(item.fecha)"
                        :filled="!validarFecha(item.fecha)"
                        dense
                        hide-details="auto"
                        class="input-goles-2"
                        :disabled="!validarFecha(item.fecha)"
                        v-model="item.golesPrediccionEquipo2"
                        :placeholder="validarFecha(item.fecha) ? 'Ej: 0' : 'X'"
                        type="number"
                      />
                    </v-col>
                  </v-row>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-container class="pa-0">
        <v-row>
          <v-col class="py-0" cols="12">
            <v-alert type="error" :value="showAlert">
              Solo se permiten Numeros
            </v-alert>
          </v-col>
        </v-row>

        <v-row>
          <v-spacer />
          <v-col class="pt-0" cols="auto">
            <v-btn
              color="success"
              right
              :loading="loadingUpdatePredicciones"
              :disabled="loadingUpdatePredicciones"
              @click="saveChanges"
            >
              Guardar Cambios
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Bandera from "../utilitarios/Bandera.vue";
import TablaGrupo from "./TablaGrupo.vue";

export default {
  name: "CartaPartidosSmall",
  components: { Bandera, TablaGrupo },
  props: ["nombre", "equipos", "partidos"],

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
        class: "px-0",
        cellClass: "px-0",
      },
      {
        text: "Goles",
        align: "center",
        sortable: false,
        value: "guion",
        width: "10%",
        class: "px-0",
      },
      {
        align: "center",
        sortable: false,
        value: "golesPrediccionEquipo2",
        class: "px-0",
        cellClass: "px-0",
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
      else if (this.$vuetify.breakpoint.name === "sm")
        return !isNaN(gol1) && !isNaN(gol2);
      else return !isNaN(parseInt(gol1)) && !isNaN(parseInt(gol2));
    },

    validarFecha(fecha) {
      // True si la fecha es mayor estricto que la fecha a validar
      let fechaAValidar = new Date();
      return fecha > fechaAValidar;
    }
  },

  computed: mapGetters(["PREDICCIONES", "IS_SCREEN_BEYOND_SMALL"]),

  mounted() {
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
</style>