<template>
  <v-card outlined style="height: 100%" class="d-flex flex-column">
    <v-card-title primary-title>
      <v-row>
        <v-col> Partidos de Grupo {{ nombre }}</v-col>
        <v-col style="text-align: end">
          <v-btn color="success" @click="saveChanges">Guardar Cambios</v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-spacer></v-spacer>

    <v-card-text>
      <v-data-table
        hide-default-header
        :headers="headers"
        :items="dataPartidos"
        item-key="id"
        hide-default-footer
        dense
        class="table-partidos"
        :item-class="fondoItem"
      >
        <template v-slot:[`item.golesEquipo1`]="{ item }">
          <td style="width: 120px">
            <v-text-field
              placeholder="Goles"
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
              placeholder="Goles"
              outlined
              dense
              hide-details="auto"
              class="input-goles-2"
              v-model="item.golesEquipo2"
            />
          </td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CartaPartidos",
  props: ["nombre", "partidos"],
  data: () => ({
    dataPartidos: [],

    headers: [
      {
        align: "start",
        sortable: false,
        value: "equipo1",
        cellClass: "cell-equipo",
      },
      {
        align: "center",
        sortable: false,
        value: "golesEquipo1",
      },
      {
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
        sortable: false,
        align: "end",
        value: "equipo2",
        cellClass: "cell-equipo",
      },
    ],
  }),
  methods: {
    fondoItem(item) {
      return item.tienePrediccion ? "fila-con-prediccion" : "";
    },

    saveChanges() {
      let hayError = false;

      hayError = this.dataPartidos.some(
        (p) =>
          !p.tienePrediccion &&
          !this.verificarGoles(p.golesEquipo1, p.golesEquipo2)
      );

      if (!hayError) {
        // TODO ver con el 0, creo que como es string anda bien
        this.dataPartidos.forEach((p) => {
          if (!p.tienePrediccion && p.golesEquipo1 && p.golesEquipo2) {
            this.$emit(
              "actualizar-prediccion",
              p.idPartido,
              p.golesEquipo1,
              p.golesEquipo2
            );
          }
        });
      }
    },

    verificarGoles(gol1, gol2) {
      if (gol1 === undefined || gol2 === undefined) return true;
      else return !isNaN(gol1) && !isNaN(gol2);
    },
  },

  beforeMount() {
    this.dataPartidos = [];

    this.partidos.forEach((partido) => {
      let newPartido = {
        idPartido: partido.idPartido,
        equipo1: partido.equipo1,
        equipo2: partido.equipo2,
        guion: "-",
        golesEquipo1: partido.tienePrediccion
          ? partido.prediccion.golesEquipo1
          : undefined,
        golesEquipo2: partido.tienePrediccion
          ? partido.prediccion.golesEquipo2
          : undefined,
        tienePrediccion: partido.tienePrediccion,
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