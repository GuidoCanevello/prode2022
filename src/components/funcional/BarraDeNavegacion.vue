<template>
  <v-navigation-drawer
    v-if="isCreated"
    v-model="showNavigation"
    :temporary="!IS_SCREEN_BEYOND_LARGE"
    :permanent="IS_SCREEN_BEYOND_LARGE"
    app
  >
    <v-container class="main-container d-flex flex-column">
      <!-- TITULO -->
      <v-container class="pa-0">
        <v-list-item :to="'/'">
          <v-list-item-content>
            <v-list-item-title class="text-h6"> Prode </v-list-item-title>
            <v-list-item-subtitle> Qatar 2022 </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-soccer-field</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-container>

      <v-divider />

      <!-- PERFIL DE USUARIO -->
      <v-container class="pa-0">
        <v-list-item>
          <v-list-item-content>
            <user-box />
          </v-list-item-content>
        </v-list-item>
      </v-container>

      <v-divider />

      <!-- NAVEGACION -->
      <v-list dense nav>
        <template v-for="item in items">
          <template v-if="checkPermissions(item)">
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
        </template>
      </v-list>

      <v-spacer />

      <v-divider />

      <v-container>
        <v-btn
          block
          color="accent"
          depressed
          @click="handleLogout"
          :loading="logoutLoading"
        >
          Cerrar Sesion
        </v-btn>
      </v-container>
    </v-container>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import UserBox from "./UserBox.vue";

export default {
  name: "BarraDeNavegacion",
  components: { UserBox },
  data() {
    return {
      items: [
        {
          title: "Inicio",
          icon: "mdi-soccer-field",
          route: "/",
        },
        {
          title: "Fase de Grupos",
          icon: "mdi-account-group-outline",
          route: "/fase-grupos",
        },
        {
          title: "Fase de Torneo",
          icon: "mdi-tournament",
          route: "/fase-torneo",
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
        {
          title: "Backend",
          icon: "",
          route: "/backend",
          isAdmin: true,
        },
      ],

      logoutLoading: false,

      showNavigationValue: false,

      isCreated: false,
    };
  },
  methods: {
    ...mapActions(["DISPATCH_LOGOUT"]),

    handleLogout() {
      this.logoutLoading = true;
      this.DISPATCH_LOGOUT().then(() => {
        this.logoutLoading = false;
      });
    },

    checkPermissions(item) {
      return (
        !item.isAdmin ||
        (item.isAdmin && this.USUARIO_NOMBRE_CUENTA === "ADMIN")
      );
    },

    triggerShowNavigation() {
      this.showNavigationValue = true;
    },
  },

  computed: {
    ...mapGetters(["USUARIO_NOMBRE_CUENTA", "IS_SCREEN_BEYOND_LARGE"]),

    showNavigation: {
      get() {
        return this.IS_SCREEN_BEYOND_MEDIUM ? true : this.showNavigationValue;
      },

      set(value) {
        this.showNavigationValue = value;
      },
    },
  },

  mounted() {
    this.isCreated = true;
  },
};
</script>

<style scoped>
.main-container {
  padding: 0%;
  height: 100%;
}
</style>