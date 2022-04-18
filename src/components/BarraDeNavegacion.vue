<template>
  <v-navigation-drawer permanente app>
    <!-- TITULO -->
    <v-list-item :to="'/'">
      <v-list-item-content>
        <v-list-item-title class="text-h6"> Prode </v-list-item-title>
        <v-list-item-subtitle> Qatar 2022 </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon>mdi-soccer-field</v-icon>
      </v-list-item-icon>
    </v-list-item>

    <v-divider />

    <!-- PERFIL DE USUARIO -->
    <v-list-item>
      <v-list-item-content>
        <user-box />
      </v-list-item-content>
    </v-list-item>

    <v-divider />
    
    <!-- NAVEGACION -->
    <v-list dense nav>
      <template v-for="item in items">
        <v-list-item
          v-if="!item.hasGroup"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group v-else :key="item.title" :prepend-icon="item.icon">
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="subitem in item.subitems"
            :key="subitem.title"
            link
            :to="item.route + subitem.route"
          >
            <v-list-item-content>
              <v-list-item-title>{{ subitem.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>{{ subitem.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import UserBox from "./UserBox.vue";

export default {
  name: "BarraDeNavegacion",
  components: { UserBox },
  data() {
    return {
      items: [
        {
          title: "Predicciones",
          icon: "mdi-head-snowflake-outline",
          route: "/predicciones",
          hasGroup: true,
          subitems: [
            {
              title: "Ver Lista de Partidos",
              icon: "mdi-view-list",
              route: "/listado",
            },
            {
              title: "Ver Fase de Grupos",
              icon: "mdi-account-group-outline",
              route: "/fase-grupos",
            },
            {
              title: "Ver Fase Final",
              icon: "mdi-tournament",
              route: "/fase-final",
            },
          ],
        },
        {
          title: "Calendario",
          icon: "mdi-calendar",
          route: "/calendario",
        },
        {
          title: "Ranking",
          icon: "mdi-trophy",
          route: "/ranking",
        },
        {
          title: "Reglamento",
          icon: "mdi-book-open-page-variant-outline",
          route: "/reglamento",
        },
      ],
    };
  },
};
</script>