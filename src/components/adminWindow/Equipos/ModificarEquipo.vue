<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col>
        <v-autocomplete
          v-model="selectedEquipo"
          :items="nombresEquipos"
          filled
          label="Equipo"
          @change="
            () => {
              showSuccessAlert = false;
            }
          "
        />
      </v-col>

      <v-col md="3" style="text-align: end">
        <v-btn color="info" @click="handleSeleccionarEquipo">
          Seleccionar
        </v-btn>
      </v-col>
    </v-row>

    <template v-if="datosEquipo.selected">
      <v-row>
        <v-col style="text-align: center">
          <h3>Modificar Datos</h3>
        </v-col>

        <v-col md="3" style="text-align: end">
          <v-btn color="success" @click="handleGuardarCambios"
            >Guardar Cambios</v-btn
          >
        </v-col>
      </v-row>

      <v-row class="mt-0">
        <v-col>
          <v-alert type="success" v-show="showSuccessAlert">
            Se Modifico el Equipo con Exito
          </v-alert>
        </v-col>
      </v-row>

      <v-row class="mt-0">
        <v-col>
          <v-text-field
            v-model="datosEquipo.nombre"
            label="Nombre"
            outlined
            clearable
            :error="errorNombre"
            @focus="
              () => {
                errorNombre = false;
                showSuccessAlert = false;
              }
            "
          />
        </v-col>
      </v-row>

      <v-row class="mt-0">
        <v-col>
          <v-text-field
            v-model="datosEquipo.puntos"
            label="Puntos"
            outlined
            clearable
            :error="errorPuntos"
            @focus="
              () => {
                errorPuntos = false;
                showSuccessAlert = false;
              }
            "
          />
        </v-col>

        <v-col>
          <v-select
            v-model="datosEquipo.grupo"
            label="Grupo"
            :items="dropwdownGrupos"
            outlined
            @focus="
              () => {
                showSuccessAlert = false;
              }
            "
          />
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <v-row class="mt-0">
        <v-col style="text-align: center">
          <h3>Sin Equipo Seleccionado</h3>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import getAllEquipos from "@/communication/getAllEquipos";
import putEquipos from "@/communication/putEquipos";

export default {
  name: "ModificarEquipo",

  data: () => ({
    errorNombre: false,
    errorPuntos: false,
    showSuccessAlert: false,

    equipos: [],

    nombresEquipos: [],
    dropwdownGrupos: ["A", "B", "C", "D", "E", "F", "G", "H"],

    selectedEquipo: null,
    idSelectedEquipo: null,
    datosEquipo: {
      selected: false,
      id: null,
      nombre: null,
      puntos: null,
      grupo: null,
    },
  }),

  methods: {
    handleSeleccionarEquipo() {
      const equipoAux = this.equipos.find(
        (e) => e.nombre === this.selectedEquipo
      );

      if (equipoAux) {
        this.datosEquipo = {
          selected: true,
          id: equipoAux._id,
          nombre: equipoAux.nombre,
          puntos: equipoAux.puntos,
          grupo: equipoAux.grupo,
        };
      } else {
        this.datosEquipo = {
          selected: false,
          id: null,
          nombre: null,
          puntos: null,
          grupo: null,
        };
      }
    },

    handleGuardarCambios() {
      if (!this.verificarNombre(this.datosEquipo.nombre)) {
        this.errorNombre = true;
      } else if (!this.verificarPuntos(this.datosEquipo.puntos)) {
        this.errorPuntos = true;
      } else {
        putEquipos(this.datosEquipo.id, {
          nombre: this.datosEquipo.nombre,
          puntos: this.datosEquipo.puntos,
          grupo: this.datosEquipo.grupo,
        }).then(() => {
          this.showSuccessAlert = true;
        });
      }
    },

    verificarNombre(nombre) {
      if (nombre === "") return false;
      else return true;
    },

    verificarPuntos(pts) {
      if (isNaN(pts)) return false;
      else return true;
    },
  },

  mounted() {
    getAllEquipos()
      .then((res) => {
        this.equipos = res;

        res.forEach((eq) => {
          this.nombresEquipos.push(eq.nombre);
        });
      })
      .catch((e) => console.log(e));
  },
};
</script>