<template>
  <v-card outlined>
    <v-container grid-list-xs>
      <v-tabs>
        <v-tab> Crear Grupos </v-tab>
        <v-tab-item>
          <abm-grupos />
        </v-tab-item>

        <v-tab> Modificar Partidos </v-tab>
        <v-tab-item>
          <abm-partidos />
        </v-tab-item>

        <v-tab> Crear Usuarios </v-tab>
        <v-tab-item>
          <abm-usuarios />
        </v-tab-item>

        <v-tab> Modificar Equipos </v-tab>
        <v-tab-item>
          <abm-equipos />
        </v-tab-item>

        <v-tab> Modificar Resultados Grupos </v-tab>
        <v-tab-item>
          <modificar-resultado-grupos />
        </v-tab-item>

        <v-tab> Modificar Datos Final </v-tab>
        <v-tab-item>
          <abm-partidos-final />
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-card>
</template>

<script>
import AbmGrupos from "./Grupos/abmGrupos.vue";
import AbmPartidos from "./Partidos/abmPartidos.vue";
import AbmUsuarios from "./Usuarios/abmUsuarios.vue";
import AbmEquipos from "./Equipos/abmEquipos.vue";
import ModificarResultadoGrupos from './ModificarResultadoGrupos.vue';
import AbmPartidosFinal from './Partidos/abmPartidosFinal.vue';

export default {
  name: "MainWindow",
  components: { AbmPartidos, AbmUsuarios, AbmGrupos, AbmEquipos, ModificarResultadoGrupos, AbmPartidosFinal },
  data: () => ({}),
};
</script>