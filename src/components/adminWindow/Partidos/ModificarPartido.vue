<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col style="text-align: right">
        <v-btn
          color="success"
          :loading="isLoading"
          :disabled="isLoading"
          @click="handleGuardarCambios"
          >Guardar Cambios</v-btn
        >
      </v-col>
    </v-row>
    <template v-for="grupo in nombresGrupos">
      <v-row :key="grupo">
        <v-col>
          <v-row>
            <v-col> Grupo {{ grupo }}: </v-col>
          </v-row>

          <v-row>
            <v-col>
              <template
                v-for="partido in partidosAux.filter((p) => p.grupo === grupo)"
              >
                <v-row :key="partido.id">
                  <v-col class="ml-3">
                    {{ partido.equipo1 }} vs. {{ partido.equipo2 }}
                  </v-col>

                  <v-col sm="2">
                    <v-text-field
                      outlined
                      dense
                      hide-details="auto"
                      v-model="partido.golesEquipo1"
                    />
                  </v-col>

                  <v-col sm="1" style="text-align: center"> - </v-col>

                  <v-col sm="2">
                    <v-text-field
                      outlined
                      dense
                      hide-details="auto"
                      v-model="partido.golesEquipo2"
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
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import addCero from "@/utils/addCero";

export default {
  name: "ModificarPartido",

  data: () => ({
    nombresGrupos: ["A", "B", "C", "D", "E", "F", "G", "H"],

    partidosAux: [],

    isLoading: false,

    minDate: "2022-11-01",
    maxDate: "2022-12-30",
  }),

  computed: mapGetters(["PARTIDOS", "EQUIPOS"]),

  methods: {
    ...mapActions(["MODIFICAR_PARTIDO"]),

    async handleGuardarCambios() {
      this.isLoading = true;

      for (const partido of this.partidosAux) {
        let fecha = new Date();
        fecha.setFullYear(partido.fecha.substring(0, 4));
        fecha.setMonth(partido.fecha.substring(5, 7) - 1);
        fecha.setDate(partido.fecha.substring(8));
        fecha.setHours(partido.hora.substring(0, 2));
        fecha.setMinutes(partido.hora.substring(3));

        await this.MODIFICAR_PARTIDO({
          id: partido.id,
          data: {
            golesEquipo1: partido.golesEquipo1,
            golesEquipo2: partido.golesEquipo2,
            fecha,
          },
        });
      }

      this.isLoading = false;
    },
  },

  mounted() {
    this.PARTIDOS.forEach((p) => {
      const fechaAux = p.fecha ? new Date(p.fecha) : new Date();

      const hora = `${addCero(fechaAux.getHours())}:${addCero(
          fechaAux.getMinutes()
        )}`,
        fecha = `${fechaAux.getFullYear()}-${addCero(
          fechaAux.getMonth() + 1
        )}-${addCero(fechaAux.getDate())}`;

      const newPartido = {
        id: p._id,
        equipo1: this.EQUIPOS.find((e) => e._id === p.equipo1).nombre,
        equipo2: this.EQUIPOS.find((e) => e._id === p.equipo2).nombre,
        golesEquipo1: p.golesEquipo1,
        golesEquipo2: p.golesEquipo2,
        grupo: p.grupo,
        hora,
        fecha,

        showTimer: false,
        showDater: false,
      };

      this.partidosAux.push(newPartido);
    });
  },
};
</script>