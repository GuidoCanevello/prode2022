/**
 * @param {String} posicion la posicion a traducir
 * 
 * @returns El nombre de la posicion en español
 */
export default function (posicion) {
    switch (posicion) {
        case "Goalkeeper":
            return "Arquero";
        case "Defender":
            return "Defensor";
        case "Midfielder":
            return "Mediocampista";
        case "Forward":
            return "Delantero";
        default:
            return "ERROR";
    }
}