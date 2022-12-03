<template>
  <v-container>
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
                    {{ partido.equipo1 }}
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

                  <v-col class="ml-3">
                    {{ partido.equipo2 }}
                  </v-col>

                  <v-col v-if="new Date(partido.fecha) < new Date()" cols="1">
                    DONE
                  </v-col>

                  <v-col v-else cols="1"> - </v-col>
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

export default {
  name: "ModificarResultadoGrupos",

  data: () => ({
    nombresGrupos: ["A", "B", "C", "D", "E", "F", "G", "H"],

    partidosAux: [],

    isLoading: false,
  }),

  computed: mapGetters(["PARTIDOS", "EQUIPOS"]),

  methods: {
    ...mapActions(["ACTUALIZAR_RESULTADO"]),

    async handleGuardarCambios() {
      this.isLoading = true;

      for (const partido of this.partidosAux) {
        if (
          partido.golesEquipo1 != undefined ||
          partido.golesEquipo2 != undefined
        ) {
          await this.ACTUALIZAR_RESULTADO({
            id: partido.id,
            data: {
              golesEquipo1: partido.golesEquipo1,
              golesEquipo2: partido.golesEquipo2,
            },
          });
        }
      }

      this.isLoading = false;
    },
  },

  mounted() {
    this.PARTIDOS.forEach((p) => {
      const newPartido = {
        id: p._id,
        equipo1: this.EQUIPOS.find((e) => e._id === p.equipo1) ? this.EQUIPOS.find((e) => e._id === p.equipo1).nombre : "",
        equipo2: this.EQUIPOS.find((e) => e._id === p.equipo2) ? this.EQUIPOS.find((e) => e._id === p.equipo2).nombre : "",
        golesEquipo1: p.golesEquipo1,
        golesEquipo2: p.golesEquipo2,
        grupo: p.grupo,
        fecha: p.fecha,
      };

      this.partidosAux.push(newPartido);
    });
  },
};
</script>