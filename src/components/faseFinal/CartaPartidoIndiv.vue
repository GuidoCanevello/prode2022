<template>
  <v-card :class="claseCarta" outlined rounded="pill">
    <v-dialog v-model="showDialog" width="1000px">
      <dialogo-partido :partido="partido" />
    </v-dialog>

    <v-card-text
      class="pa-5"
      style="text-align: center"
      @click="showDialog = true"
    >
      <v-row>
        <v-col class="pt-0">
          <h2>
            {{
              partido.identificadorEliminatorias
                ? partido.identificadorEliminatorias
                : partido.tipoEliminatoria
            }}
          </h2>
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-col class="pr-0" cols="auto">
          <bandera :code="partido.codeEquipo1" />
        </v-col>

        <v-col cols="auto">
          <v-badge
            bordered
            color="info"
            icon="mdi-brain"
            :value="partido.tienePrediccion && partido.prediccion.ganaEquipo1"
          >
            <h3>
              {{ partido.nombreEquipo1 }}
            </h3>
          </v-badge>
        </v-col>
        <v-spacer />
      </v-row>

      <p v-if="partido.tipoEliminatoria != 'Octavos'" class="ma-0">
        ({{
          partido.tienePrediccionEquipo1
            ? partido.prediccionNombreEquipo1
            : "Sin Prediccion"
        }})
      </p>
      <p v-else class="ma-0">-</p>
      <p class="ma-0">vs</p>
      <p v-if="partido.tipoEliminatoria != 'Octavos'" class="ma-0">
        ({{
          partido.tienePrediccionEquipo2
            ? partido.prediccionNombreEquipo2
            : "Sin Prediccion"
        }})
      </p>
      <p v-else class="ma-0">-</p>

      <v-row>
        <v-spacer />
        <v-col class="pr-0" cols="auto">
          <bandera :code="partido.codeEquipo2" />
        </v-col>

        <v-col cols="auto">
          <v-badge
            bordered
            color="info"
            icon="mdi-brain"
            :value="partido.tienePrediccion && !partido.prediccion.ganaEquipo1"
          >
            <h3>{{ partido.nombreEquipo2 }}</h3>
          </v-badge>
        </v-col>
        <v-spacer />
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import Bandera from "../utilitarios/Bandera.vue";
import DialogoPartido from "./DialogoPartido.vue";

export default {
  components: { DialogoPartido, Bandera },
  name: "CartaPartidoIndiv",
  props: ["partido"],
  data() {
    return {
      showDialog: false,
    };
  },
  computed: {
    claseCarta() {
      const hoy = new Date();

      if (
        hoy < new Date(this.partido.fecha) ||
        this.partido.golesEquipo1 == undefined
      ) {
        if (!this.partido.tienePrediccion) return "card-sin-prediccion";
        else return "card-con-prediccion";
      } else {
        if (!this.partido.tienePrediccion) return "card-sin-prediccion-vencida";

        const tienePrediccion = this.partido.tienePrediccion,
          prediccionGanaEquipo1 =
            tienePrediccion && this.partido.prediccion.ganaEquipo1,
          realGanoEquipo1 =
            this.partido.golesEquipo1 > this.partido.golesEquipo2 ||
            this.partido.penalesEquipo1 > this.partido.penalesEquipo2,
          prediccionGanaEquipo2 =
            tienePrediccion && !this.partido.prediccion.ganaEquipo1,
          realGanoEquipo2 =
            this.partido.golesEquipo2 > this.partido.golesEquipo1 ||
            this.partido.penalesEquipo2 > this.partido.penalesEquipo1;

        if (
          tienePrediccion &&
          ((prediccionGanaEquipo1 && realGanoEquipo1) ||
            (prediccionGanaEquipo2 && realGanoEquipo2))
        )
          return "card-correcta";
        else return "card-errada";
      }
    },
  },
};
</script>

<style scoped>
.v-card:hover {
  cursor: pointer;
}

.card-sin-prediccion:hover {
  background-color: #e0e0e0 !important;
}

.card-con-prediccion {
  background-color: #b3e5fc;
}

.card-con-prediccion:hover {
  background-color: #81d4fa !important;
}

.card-sin-prediccion-vencida {
  background-color: #cfd8dc !important;
}

.card-sin-prediccion-vencida:hover {
  background-color: #90a4ae !important;
}

.card-correcta {
  background-color: #81c784;
}

.card-correcta:hover {
  background-color: #66bb6a !important;
}

.card-errada {
  background-color: #ef9a9a;
}

.card-errada:hover {
  background-color: #ef5350 !important;
}
</style>