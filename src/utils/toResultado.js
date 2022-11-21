export default function (golesEquipo1, golesEquipo2) {
    if (golesEquipo1 > golesEquipo2) return 1;
    else if (golesEquipo2 > golesEquipo1) return 2;
    else return 0;
}