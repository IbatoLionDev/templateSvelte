export function formToJson(form) {

    form = Array.from(form.elements);
    let jsonObject = {};

    for (let element of form) {
        if (element.name) {
            if (element.type === 'checkbox') jsonObject[element.name] = element.checked;
            else if (element.type === 'number') jsonObject[element.name] = Number(element.value);
            else jsonObject[element.name] = element.value;
        }
    }

    return jsonObject;
}

function filterData(data, values, startVales) {
    return data.filter((_,i) => values[i] !== startVales[i])
    return values.reduce((acc, item, i) => {
        if (item != startVales[i])
            acc.push({ name: data[i].name, value: data[i].value })
    })
}

export function putForm(startValues, data, item, action) {
    let filterData = []
    filterData = data.filter((_,i) => data[i].value !== startValues[i])
    
    setData(filterData, action, item[idType + "Id"], idType, null);
    
    return filterData
}

export function setData(elements, action, id, idType, quantity, errorMsg, successMsg) {

    return new Promise(async (resolve, reject) => {
        idType = !idType ? action.split('.')[0].toLowerCase().slice(0, -1) : idType;
        let data = {}
        for (let element of elements) {
            if (element.name && element.value) data[element.name] = convertToUnixIfDate(element.value);

        }
        const isArray = Array.isArray(id)
        if (id && !isArray) {
            data[idType + "Id"] = id
        } else if (id && isArray) {
            id.forEach((element, i) => {
                data[idType[i]] = element
            });
        }
        if (quantity) {
            data = Array.from({ length: quantity }, (v, i) => {
                let newData = { ...data };
                let firstKey = Object.keys(newData)[0];
                newData[firstKey] = newData[firstKey] + " " + (i + 1).toString();
                return newData;
            });
        }

        resolve(await SetCommand(action, data, errorMsg, successMsg))
    });
}