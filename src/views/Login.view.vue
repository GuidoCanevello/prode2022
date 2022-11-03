<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-card class="main-card" elevation="4" outlined>
        <v-card-title primary-title>
          <v-container class="px-14">
            <v-img
              lazy-src="../assets/logo-qatar.png"
              src="../assets/logo-qatar.png"
            />
          </v-container>
        </v-card-title>

        <v-form
          ref="form"
          v-model="valido"
          lazy-validation
          @submit.prevent="submitHandler"
        >
          <v-card-text class="pt-4">
            <v-text-field
              v-model="nombre"
              label="Nombre de Usuario"
              prepend-icon="mdi-account-outline"
              outlined
              required
              :rules="nombreRules"
              :error="nombreError"
              :error-messages="mensajeNombreError"
              :disabled="IS_LOADING_LOGIN"
              @focus="resetValidacion"
            />

            <v-text-field
              v-model="password"
              label="Contraseña"
              type="password"
              prepend-icon="mdi-lock"
              outlined
              required
              :rules="passwordRules"
              :error="passwordError"
              :error-messages="mensajePasswordError"
              :disabled="IS_LOADING_LOGIN"
              @focus="resetValidacion"
            />
          </v-card-text>

          <v-card-actions>
            <v-container class="pt-0">
              <v-btn
                color="success"
                type="submit"
                :disabled="IS_LOADING_LOGIN"
                :loading="IS_LOADING_LOGIN"
              >
                Ingresar
              </v-btn>
            </v-container>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      valido: true,
      nombre: "",
      password: "",

      nombreRules: [(v) => !!v || "Debe ingresar un Nombre de Usuario"],
      nombreError: false,
      mensajeNombreError: "",
      passwordRules: [(v) => !!v || "Debe ingresar una Contraseña"],
      passwordError: false,
      mensajePasswordError: "",
    };
  },
  computed: mapGetters(["IS_LOADING_LOGIN", "IS_LOGGED"]),
  methods: {
    ...mapActions(["DISPATCH_LOGIN", "DISPATCH_GET_INITIAL_DATA"]),

    resetValidacion() {
      this.nombreError = false;
      this.mensajeNombreError = "";
      this.passwordError = false;
      this.mensajePasswordError = "";
      this.$refs.form.resetValidation();
    },

    submitHandler() {
      if (this.$refs.form.validate()) {
        this.DISPATCH_LOGIN({
          username: this.nombre,
          password: this.password,
        })
          .then((e) => {
            this.DISPATCH_GET_INITIAL_DATA();
            this.$router.push("/");
          })
          .catch((e) => {
            if (e.nombreError) {
              this.nombreError = true;
              this.mensajeNombreError = "Usuario no Valido";
            } else if (e.passwordError) {
              this.passwordError = true;
              this.mensajePasswordError = "Contraseña Incorrecta";
              this.password = "";
            }
          });
      }
    },
  },
};
</script>

<style scoped>
.main-card {
  width: 30rem;
  flex-direction: column;
  align-content: center;
}
</style>