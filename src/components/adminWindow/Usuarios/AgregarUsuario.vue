<template>
  <v-container grid-list-xs>
    <v-row>
      <v-col>
        {{ msg }}
      </v-col>
    </v-row>

    <v-row>
      <v-col> <h2>Nuevo Usuario</h2> </v-col>

      <v-col style="text-align: right">
        <v-btn
          color="success"
          :loading="isLoading"
          :disabled="isLoading"
          @click="handleGuardarCambios"
        >
          Crear
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="nombre"
          label="Nombre de Usuario"
          prepend-icon="mdi-account-outline"
          outlined
          required
          :disabled="isLoading"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-text-field
          v-model="password"
          label="Contraseña"
          prepend-icon="mdi-lock"
          outlined
          required
          :disabled="isLoading"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AgregarUsuario",

  data: () => ({
    nombre: "",
    password: "",

    isLoading: false,
    msg: "",
  }),

  methods: {
    ...mapActions(["CREAR_USUARIO"]),

    async handleGuardarCambios() {
      this.isLoading = true;

      this.CREAR_USUARIO({
        nombreCuenta: this.nombre,
        password: this.password,
      })
        .then(() => {
          this.msg = "Exito";
        })
        .catch(() => {
          this.msg = "Error";
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>