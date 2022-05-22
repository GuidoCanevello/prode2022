<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card>
          <v-container grid-list-xs>
            <h1>Predicciones</h1>
          </v-container>
        </v-card>
      </v-col>
    </v-row>

    <router-view />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Predicciones",
  data() {
    return {};
  },
  computed: mapGetters(["IS_LOGGED"]),
  methods: {
    ...mapActions(["DISPATCH_GET_INITIAL_DATA", "CHECK_LOGIN_STATUS"]),
  },
  async created() {
    let response = await this.CHECK_LOGIN_STATUS();
    if (response) this.DISPATCH_GET_INITIAL_DATA();
  },
};
</script>
