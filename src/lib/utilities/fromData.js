export function fromDataToJson(formData) {
    let jsonObject = {};

    for (const [key, value] of formData.entries()) {
        // Comprueba si el valor es numérico
        if (!isNaN(value)) {
            // Convierte el valor a un número antes de agregarlo al objeto JSON
            jsonObject[key] = Number(value);
        } else {
            jsonObject[key] = value;
        }
    }
    return jsonObject;
}
