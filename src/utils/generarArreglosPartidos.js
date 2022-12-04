export default function (allPartidos, allEquipos, allPredicciones) {
  let partidosOctavos = [];

  allPartidos.filter((p) => p.tipoEliminatoria == "Octavos").forEach(
    (partido) => {
      if (allEquipos.length > 0) {
        let prediccion = allPredicciones.find(
          (p) => p.partidoId == partido._id
        );
        let newPartido = {
          id: partido._id,
          idEquipo1: partido.equipo1,
          nombreEquipo1: allEquipos.find((e) => e._id == partido.equipo1)
            .nombre,
          idEquipo2: partido.equipo2,
          nombreEquipo2: allEquipos.find((e) => e._id == partido.equipo2)
            .nombre,
          fecha: partido.fecha,
          tienePrediccion: prediccion != undefined,
          prediccionGanaEquipo1: prediccion && prediccion.golesEquipo1 == 1,
          partidoGanoEquipo1: partido.golesEquipo1 > partido.golesEquipo2 ||
            partido.penalesEquipo1 > partido.penalesEquipo2,
          prediccionEsValida: true,
        };

        partidosOctavos.push(newPartido);
      }
    }
  );

  let partidosCuartos = [];

  allPartidos.filter((p) => p.tipoEliminatoria == "Cuartos").forEach(
    (partido) => {
      if (allEquipos.length > 0) {
        let prediccion = allPredicciones.find(
          (p) => p.partidoId == partido._id
        ), prediccionEquipo1 = partidosOctavos.find(
          (p) => p.id == partido.partidoEquipo1
        ), prediccionEquipo2 = partidosOctavos.find(
          (p) => p.id == partido.partidoEquipo2
        );

        let nombreEquipo1 = prediccionEquipo1 && prediccionEquipo1.tienePrediccion
          ? prediccionEquipo1.prediccionGanaEquipo1
            ? prediccionEquipo1.nombreEquipo1
            : prediccionEquipo1.nombreEquipo2
          : "Sin Prediccion";

        let idEquipo1 = prediccionEquipo1 && prediccionEquipo1.tienePrediccion
          ? prediccionEquipo1.prediccionGanaEquipo1
            ? prediccionEquipo1.idEquipo1
            : prediccionEquipo1.idEquipo1
          : null;

        let nombreEquipo2 = prediccionEquipo2 && prediccionEquipo2.tienePrediccion
          ? prediccionEquipo2.prediccionGanaEquipo1
            ? prediccionEquipo2.nombreEquipo1
            : prediccionEquipo2.nombreEquipo2
          : "Sin Prediccion";

        let idEquipo2 = prediccionEquipo2 && prediccionEquipo2.tienePrediccion
          ? prediccionEquipo2.prediccionGanaEquipo1
            ? prediccionEquipo2.idEquipo1
            : prediccionEquipo2.idEquipo2
          : null;

        let prediccionGanaEquipo1 = prediccion && prediccion.golesEquipo1 == 1, partidoGanoEquipo1 = partido.golesEquipo1 > partido.golesEquipo2 ||
          partido.penalesEquipo1 > partido.penalesEquipo2;

        let newPartido = {
          id: partido._id,
          nombreEquipo1,
          nombreEquipo2,
          fecha: partido.fecha,
          tienePrediccion: prediccion != undefined,
          prediccionGanaEquipo1,
          partidoGanoEquipo1,
          identificadorEliminatorias: partido.identificadorEliminatorias,
          prediccionEsValida: prediccionGanaEquipo1
            ? idEquipo1 == partido.equipo1
            : idEquipo2 == partido.equipo2,
        };

        partidosCuartos.push(newPartido);
      }
    }
  );

  let partidosSemifinales = [];

  allPartidos.filter((p) => p.tipoEliminatoria == "Semifinales").forEach(
    (partido) => {
      if (allEquipos.length > 0) {
        let prediccion = allPredicciones.find(
          (p) => p.partidoId == partido._id
        ), prediccionEquipo1 = partidosCuartos.find(
          (p) => p.id == partido.partidoEquipo1
        ), prediccionEquipo2 = partidosCuartos.find(
          (p) => p.id == partido.partidoEquipo2
        );

        let nombreEquipo1 = prediccionEquipo1 && prediccionEquipo1.tienePrediccion
          ? prediccionEquipo1.prediccionGanaEquipo1
            ? prediccionEquipo1.nombreEquipo1
            : prediccionEquipo1.nombreEquipo2
          : "Sin Prediccion";

        let idEquipo1 = prediccionEquipo1 && prediccionEquipo1.tienePrediccion
          ? prediccionEquipo1.prediccionGanaEquipo1
            ? prediccionEquipo1.idEquipo1
            : prediccionEquipo1.idEquipo1
          : null;

        let nombreEquipo2 = prediccionEquipo2 && prediccionEquipo2.tienePrediccion
          ? prediccionEquipo2.prediccionGanaEquipo1
            ? prediccionEquipo2.nombreEquipo1
            : prediccionEquipo2.nombreEquipo2
          : "Sin Prediccion";

        let idEquipo2 = prediccionEquipo2 && prediccionEquipo2.tienePrediccion
          ? prediccionEquipo2.prediccionGanaEquipo1
            ? prediccionEquipo2.idEquipo1
            : prediccionEquipo2.idEquipo2
          : null;

        let prediccionGanaEquipo1 = prediccion && prediccion.golesEquipo1 == 1, partidoGanoEquipo1 = partido.golesEquipo1 > partido.golesEquipo2 ||
          partido.penalesEquipo1 > partido.penalesEquipo2;

        let newPartido = {
          id: partido._id,
          nombreEquipo1,
          nombreEquipo2,
          fecha: partido.fecha,
          tienePrediccion: prediccion != undefined,
          prediccionGanaEquipo1,
          partidoGanoEquipo1,
          identificadorEliminatorias: partido.identificadorEliminatorias,
          prediccionEsValida: prediccionGanaEquipo1
            ? idEquipo1 == partido.equipo1
            : idEquipo2 == partido.equipo2,
        };

        partidosSemifinales.push(newPartido);
      }
    }
  );

  let partidosFinales = [];

  let partidoFinal = allPartidos.find((p) => p.tipoEliminatoria == "Final");
  let partidoTercero = allPartidos.find(
    (p) => p.tipoEliminatoria == "Tercero"
  );

  if (allEquipos.length > 0) {
    // Final
    let prediccion = allPredicciones.find(
      (p) => p.partidoId == partidoFinal._id
    ), prediccionEquipo1 = partidosSemifinales.find(
      (p) => p.id == partidoFinal.partidoEquipo1
    ), prediccionEquipo2 = partidosSemifinales.find(
      (p) => p.id == partidoFinal.partidoEquipo2
    );

    let nombreEquipo1 = prediccionEquipo1 && prediccionEquipo1.tienePrediccion
      ? prediccionEquipo1.prediccionGanaEquipo1
        ? prediccionEquipo1.nombreEquipo1
        : prediccionEquipo1.nombreEquipo2
      : "Sin Prediccion";

    let idEquipo1 = prediccionEquipo1 && prediccionEquipo1.tienePrediccion
      ? prediccionEquipo1.prediccionGanaEquipo1
        ? prediccionEquipo1.idEquipo1
        : prediccionEquipo1.idEquipo1
      : null;

    let nombreEquipo2 = prediccionEquipo2 && prediccionEquipo2.tienePrediccion
      ? prediccionEquipo2.prediccionGanaEquipo1
        ? prediccionEquipo2.nombreEquipo1
        : prediccionEquipo2.nombreEquipo2
      : "Sin Prediccion";

    let idEquipo2 = prediccionEquipo2 && prediccionEquipo2.tienePrediccion
      ? prediccionEquipo2.prediccionGanaEquipo1
        ? prediccionEquipo2.idEquipo1
        : prediccionEquipo2.idEquipo2
      : null;

    let prediccionGanaEquipo1 = prediccion && prediccion.golesEquipo1 == 1, partidoGanoEquipo1 = partidoFinal.golesEquipo1 > partidoFinal.golesEquipo2 ||
      partidoFinal.penalesEquipo1 > partidoFinal.penalesEquipo2;

    let newPartido = {
      id: partidoFinal._id,
      nombreEquipo1,
      nombreEquipo2,
      fecha: partidoFinal.fecha,
      tienePrediccion: prediccion != undefined,
      prediccionGanaEquipo1,
      partidoGanoEquipo1,
      identificadorEliminatorias: partidoFinal.identificadorEliminatorias,
      prediccionEsValida: prediccionGanaEquipo1
        ? idEquipo1 == partidoFinal.equipo1
        : idEquipo2 == partidoFinal.equipo2,
    };

    partidosFinales.push(newPartido);

    // Tercero
    prediccion = allPredicciones.find(
      (p) => p.partidoId == partidoTercero._id
    );
    prediccionEquipo1 = partidosSemifinales.find(
      (p) => p.id == partidoTercero.partidoEquipo1
    );
    prediccionEquipo2 = partidosSemifinales.find(
      (p) => p.id == partidoTercero.partidoEquipo2
    );

    nombreEquipo1 =
      prediccionEquipo1 && prediccionEquipo1.tienePrediccion
        ? !prediccionEquipo1.prediccionGanaEquipo1
          ? prediccionEquipo1.nombreEquipo1
          : prediccionEquipo1.nombreEquipo2
        : "Sin Prediccion";

    idEquipo1 =
      prediccionEquipo1 && prediccionEquipo1.tienePrediccion
        ? !prediccionEquipo1.prediccionGanaEquipo1
          ? prediccionEquipo1.idEquipo1
          : prediccionEquipo1.idEquipo1
        : null;

    nombreEquipo2 =
      prediccionEquipo2 && prediccionEquipo2.tienePrediccion
        ? !prediccionEquipo2.prediccionGanaEquipo1
          ? prediccionEquipo2.nombreEquipo1
          : prediccionEquipo2.nombreEquipo2
        : "Sin Prediccion";

    idEquipo2 =
      prediccionEquipo2 && prediccionEquipo2.tienePrediccion
        ? !prediccionEquipo2.prediccionGanaEquipo1
          ? prediccionEquipo2.idEquipo1
          : prediccionEquipo2.idEquipo2
        : null;

    prediccionGanaEquipo1 = prediccion && prediccion.golesEquipo1 == 1;
    partidoGanoEquipo1 =
      partidoTercero.golesEquipo1 > partidoTercero.golesEquipo2 ||
      partidoTercero.penalesEquipo1 > partidoTercero.penalesEquipo2;

    newPartido = {
      id: partidoTercero._id,
      nombreEquipo1,
      nombreEquipo2,
      fecha: partidoTercero.fecha,
      tienePrediccion: prediccion != undefined,
      prediccionGanaEquipo1,
      partidoGanoEquipo1,
      identificadorEliminatorias: partidoTercero.identificadorEliminatorias,
      prediccionEsValida: prediccionGanaEquipo1
        ? idEquipo1 == partidoTercero.equipo1
        : idEquipo2 == partidoTercero.equipo2,
    };

    partidosFinales.push(newPartido);
  }

  return [partidosOctavos, partidosCuartos, partidosSemifinales, partidosFinales]
}