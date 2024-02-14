export function formToJson(form) {
    let jsonObject = {};

    // Itera sobre todos los elementos del formulario
    for (let element of form.elements) {
        // Solo procesa los elementos con nombre
        if (element.name) {
            // Trata los elementos de tipo 'checkbox' de manera especial
            if (element.type === 'checkbox') {
                jsonObject[element.name] = element.checked;
            } 
            // Si el elemento es de tipo 'number', convierte el valor a un número
            else if (element.type === 'number') {
                jsonObject[element.name] = Number(element.value);
            } 
            // Para todos los demás tipos de elementos, simplemente guarda el valor
            else {
                jsonObject[element.name] = element.value;
            }
        }
    }

    return jsonObject;
}
