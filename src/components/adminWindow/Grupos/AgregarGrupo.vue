<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col>
        <v-select
          v-model="groupData.nombre"
          label="Nombre del Grupo"
          :items="dropdownNombres"
          outlined
          hide-details="auto"
          :error="errorNombre"
          @change="
            () => {
              errorNombre = false;
            }
          "
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col style="text-align: center">
        <h3>Equipos</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-data-table
          hide-default-header
          :headers="headers"
          :items="groupData.equipos"
          item-key="id"
          hide-default-footer
          dense
        >
          <template v-slot:[`item.nombre`]="{ item }">
            <td>
              <v-text-field
                placeholder="Nombre de Equipo"
                outlined
                dense
                hide-details="auto"
                v-model="item.nombre"
                :error="item.errorNombre"
                @change="
                  () => {
                    item.errorNombre = false;
                  }
                "
              />
            </td>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col style="text-align: end">
        <v-btn
          color="success"
          :loading="isLoading"
          :disabled="isLoading"
          @click="handleGuardar"
          >Guardar</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AgregarGrupo",

  data: () => ({
    isLoading: false,
    errorNombre: false,

    groupData: {
      nombre: null,

      equipos: [
        {
          texto: "Equipo 1",
          errorNombre: false,
          nombre: null,
        },
        {
          texto: "Equipo 2",
          errorNombre: false,
          nombre: null,
        },
        {
          texto: "Equipo 3",
          errorNombre: false,
          nombre: null,
        },
        {
          texto: "Equipo 4",
          errorNombre: false,
          nombre: null,
        },
      ],
    },

    dropdownNombres: ["A", "B", "C", "D", "E", "F", "G", "H"],

    headers: [
      {
        align: "start",
        sortable: false,
        value: "texto",
      },
      {
        sortable: false,
        value: "nombre",
      },
    ],
  }),

  methods: {
    ...mapActions(["CREAR_GRUPO"]),
    async handleGuardar() {
      this.isLoading = true;

      let ejecucionCorrecta = true;

      if (!this.groupData.nombre) {
        this.errorNombre = true;
        ejecucionCorrecta = false;
      }

      this.groupData.equipos.forEach((e) => {
        if (!e.nombre) {
          e.errorNombre = true;
          ejecucionCorrecta = false;
        }
      });

      if (ejecucionCorrecta) {
        let nombresEquipos = [];
        this.groupData.equipos.forEach((e) => nombresEquipos.push(e.nombre));

        await this.CREAR_GRUPO({
          nombre: this.groupData.nombre,
          equipos: nombresEquipos,
        });
      }

      this.isLoading = false;
    },
  },
};
</script>