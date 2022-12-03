<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col style="text-align: right">
        <v-btn
          color="success"
          :loading="isLoading"
          :disabled="isLoading"
          @click="handleModificarData"
        >
          Modificar Data
        </v-btn>
      </v-col>

      <v-col style="text-align: right">
        <v-btn
          color="success"
          :loading="isLoading"
          :disabled="isLoading"
          @click="handleUpdateResultados"
        >
          Update Resultados
        </v-btn>
      </v-col>
    </v-row>

    <template v-for="partido in partidosAux">
      <v-row :key="partido.id + '1'">
        <v-col>
          {{ partido.tipoEliminatoria }} -
          {{ partido.identificadorEliminatorias }}
        </v-col>
        <v-col>
          {{ partido.equipo1 }}
        </v-col>

        <v-autocomplete
          v-model="partido.equipo1"
          :items="nombresEquipos"
          filled
          label="Equipo1"
          dense
        />
        <v-col sm="1" style="text-align: center"> - </v-col>

        <v-autocomplete
          v-model="partido.equipo2"
          :items="nombresEquipos"
          filled
          label="Equipo1"
          dense
        />

        <v-col>
          {{ partido.equipo2 }}
        </v-col>
      </v-row>

      <v-row :key="partido.id + '2'">
        <v-col sm="2">
          <v-text-field
            outlined
            dense
            hide-details="auto"
            v-model="partido.golesEquipo1"
            label="Goles"
          />
        </v-col>

        <v-col sm="2">
          <v-text-field
            outlined
            dense
            hide-details="auto"
            v-model="partido.penalesEquipo1"
            label="Penales"
          />
        </v-col>

        <v-col sm="1" style="text-align: center"> - </v-col>

        <v-col sm="2">
          <v-text-field
            outlined
            dense
            hide-details="auto"
            v-model="partido.penalesEquipo2"
            label="Penales"
          />
        </v-col>

        <v-col sm="2">
          <v-text-field
            outlined
            dense
            hide-details="auto"
            v-model="partido.golesEquipo2"
            label="Goles"
          />
        </v-col>

        <v-col>
          <v-menu
            v-model="partido.showDater"
            :nudge-right="40"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="partido.fecha"
                label="Fecha"
                readonly
                v-bind="attrs"
                v-on="on"
                hide-details="auto"
              />
            </template>

            <v-date-picker
              v-if="partido.showDater"
              v-model="partido.fecha"
              :min="minDate"
              :max="maxDate"
            />
          </v-menu>
        </v-col>

        <v-col>
          <v-menu
            v-model="partido.showTimer"
            :nudge-right="40"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="partido.hora"
                label="Hora"
                readonly
                v-bind="attrs"
                v-on="on"
                hide-details="auto"
              />
            </template>

            <v-time-picker
              v-if="partido.showTimer"
              v-model="partido.hora"
              full-width
              @click:minute="partido.showTimer = false"
            />
          </v-menu>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import addCero from "@/utils/addCero";

export default {
  name: "abmPartidosFinal",

  data: () => ({
    partidosAux: [],
    nombresEquipos: [],

    isLoading: false,

    minDate: "2022-11-01",
    maxDate: "2022-12-30",
  }),

  computed: mapGetters(["PARTIDOS", "EQUIPOS"]),

  methods: {
    ...mapActions(["MODIFICAR_PARTIDO", "ACTUALIZAR_RESULTADO_FINAL"]),

    async handleUpdateResultados() {
      console.log("Actualizar Resultado Final")
      this.isLoading = true;

      for (const partido of this.partidosAux) {
        await this.ACTUALIZAR_RESULTADO_FINAL({
          id: partido.id,
          data: {
            golesEquipo1: partido.golesEquipo1,
            penalesEquipo1: partido.penalesEquipo1,
            golesEquipo2: partido.golesEquipo2,
            penalesEquipo2: partido.penalesEquipo2
          },
        });
      }

      this.isLoading = false;
    },

    async handleModificarData() {
      console.log("Modificar Data")
      this.isLoading = true;

      for (const partido of this.partidosAux) {
        console.log("nuevo Partido", partido)
        let fecha = new Date();
        fecha.setFullYear(partido.fecha.substring(0, 4));
        fecha.setMonth(partido.fecha.substring(5, 7) - 1);
        fecha.setDate(partido.fecha.substring(8));
        fecha.setHours(partido.hora.substring(0, 2));
        fecha.setMinutes(partido.hora.substring(3));

        await this.MODIFICAR_PARTIDO({
          id: partido.id,
          data: {
            equipo1: this.EQUIPOS.find(e => e.nombre == partido.equipo1) ? this.EQUIPOS.find(e => e.nombre == partido.equipo1)._id : "",
            equipo2: this.EQUIPOS.find(e => e.nombre == partido.equipo2) ? this.EQUIPOS.find(e => e.nombre == partido.equipo2)._id : "",
            fecha,
          },
        });
      }

      this.isLoading = false;
    },
  },

  mounted() {
    this.PARTIDOS.filter((p) => p.esEliminatoria).forEach((p) => {
      const fechaAux = p.fecha ? new Date(p.fecha) : new Date();

      const hora = `${addCero(fechaAux.getHours())}:${addCero(
          fechaAux.getMinutes()
        )}`,
        fecha = `${fechaAux.getFullYear()}-${addCero(
          fechaAux.getMonth() + 1
        )}-${addCero(fechaAux.getDate())}`;

      const objEquipo1 = this.EQUIPOS.find((e) => e._id === p.equipo1),
        objEquipo2 = this.EQUIPOS.find((e) => e._id === p.equipo2);

      const newPartido = {
        id: p._id,
        equipo1: objEquipo1 ? objEquipo1.nombre : "",
        equipo2: objEquipo2 ? objEquipo2.nombre : "",
        golesEquipo1: p.golesEquipo1,
        penalesEquipo1: p.penalesEquipo1,
        golesEquipo2: p.golesEquipo2,
        penalesEquipo2: p.penalesEquipo2,
        tipoEliminatoria: p.tipoEliminatoria,
        identificadorEliminatorias: p.identificadorEliminatorias,

        hora,
        fecha,

        showTimer: false,
        showDater: false,
      };

      this.partidosAux.push(newPartido);
    });

    this.EQUIPOS.forEach((e) => this.nombresEquipos.push(e.nombre));
  },
};
</script>