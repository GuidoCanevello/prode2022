/**
 * @param {Number} num El numero a agregar
 * 
 * @returns String con un cero agregado si el numero es de un solo digito
 */
export default function (num) {
    return `${num > 9 ? "" : "0"}${num}`
}