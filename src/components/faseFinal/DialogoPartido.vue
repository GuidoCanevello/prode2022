<template>
  <v-card>
    <v-card-title>
      <v-row>
        <v-col>
          Partido:
          {{
            partido.identificadorEliminatorias
              ? partido.identificadorEliminatorias
              : partido.tipoEliminatoria
          }}
        </v-col>

        <v-col style="text-align: end">
          {{ partido.nombreEquipo1 }} vs. {{ partido.nombreEquipo2 }}
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-subtitle> {{ formatFecha(partido.fecha) }} </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col>
          <template v-if="partido.tipoEliminatoria != 'Octavos'">
            <h2>Tu Pronostico:</h2>
            ({{
              partido.tienePrediccionEquipo1
                ? partido.prediccionNombreEquipo1
                : "Sin Prediccion"
            }}) vs. ({{
              partido.tienePrediccionEquipo2
                ? partido.prediccionNombreEquipo2
                : "Sin Prediccion"
            }})
          </template>
        </v-col>
      </v-row>

      <v-row
        v-if="
          partido.tipoEliminatoria != 'Octavos'
            ? partido.tienePrediccionEquipo1 && partido.tienePrediccionEquipo2
            : true
        "
      >
        <v-col md="6" cols="12">
          <v-btn color="success" block>
            Victoria para {{ partido.nombreEquipo1 }}
          </v-btn>
        </v-col>

        <v-col md="6" cols="12">
          <v-btn color="success" block>
            Victoria para {{ partido.nombreEquipo2 }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import obtenerNombreDia from '@/utils/obtenerNombreDia';
import addCero from '@/utils/addCero';

export default {
  name: "DialogoPartido",
  props: ["partido"],
  methods: {
    formatFecha(fecha) {
      const nombreDia = obtenerNombreDia(fecha.getDay()),
        dia = addCero(fecha.getDate()),
        mes = addCero(fecha.getMonth() + 1),
        hora = addCero(fecha.getHours()),
        minutos = addCero(fecha.getMinutes());

      return `${nombreDia} ${dia}/${mes} - ${hora}:${minutos}`;
    },
  },
};
</script>