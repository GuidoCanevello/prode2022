<template>
  <v-card outlined>
    <v-container grid-list-xs>
      <v-tabs>
        <v-tab> ABM Partidos </v-tab>
        <v-tab-item>
          <abm-partidos />
        </v-tab-item>

        <v-tab> ABM Usuarios </v-tab>
        <v-tab-item>
          <abm-usuarios />
        </v-tab-item>

        <v-tab> ABM Grupos </v-tab>
        <v-tab-item>
          <abm-grupos />
        </v-tab-item>

        <v-tab> ABM Equipos </v-tab>
        <v-tab-item>
          <abm-equipos />
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-card>
</template>

<script>
import AbmGrupos from "./Grupos/abmGrupos.vue";
import AbmPartidos from "./abmPartidos.vue";
import AbmUsuarios from "./abmUsuarios.vue";
import AbmEquipos from "./Equipos/abmEquipos.vue";

export default {
  name: "MainWindow",
  components: { AbmPartidos, AbmUsuarios, AbmGrupos, AbmEquipos },
  data: () => ({}),
};
</script>