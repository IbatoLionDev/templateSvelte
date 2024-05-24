import type { State } from '@vincjo/datatables/remote'
import { tableCommand, dataTableStore } from '$lib/store/store';
import { get } from 'svelte/store';
import { Api } from './api';
export const loadDataTable = async (state: State) => {
    const tableCommandStore: any = get(tableCommand)
    const action = tableCommandStore.action.split(".")[0]
    const stateConst = getParams(state)
    const { sort, search } = stateConst

    let dataTable
    if (search && search.length < 5) return null
    dataTable = await Api(tableCommandStore.endpoint,
        { ...tableCommandStore.data },
        sort ? stateConst : ({ ...tableCommandStore.state, ...stateConst } || {}));
    console.log(stateConst);

    dataTable = dataTable.data
    dataTableStore.set(dataTable)

    return dataTable
}

interface Params {
    search?: string;
    offset: number;
    limit: number;
    sort?: string | number | boolean;
    order?: string | number | boolean;
    [key: string]: number | string | boolean | undefined;
}

const getParams = (state: State | null): Params | null => {
    if (state === null) {
        return null;
    }

    let { search, offset, rowsPerPage, sort, filters } = state;

    let params: Params = {
        offset: offset,
        limit: rowsPerPage
    }
    if (search) {
        params.search = search;
    }
    if (sort) {
        params.sort = sort.orderBy;
        params.order = sort.direction;
    }
    if (filters) {
        filters.forEach(({ filterBy, value }) => {
            params[filterBy] = value;
        });
    }
    return params;
}


// Función para convertir camelCase en palabras separadas
const splitCamelCase = (text) => text.replace(/([a-z0-9])([A-Z])/g, '$1 $2');

// Función de flecha para convertir la primera letra de cada palabra en mayúscula
const capitalizeFirstLetter = (text) => text.charAt(0).toUpperCase() + text.slice(1);

export function getHeaders(data: any) {
    const processKeys = (keys) => keys.map(key => capitalizeFirstLetter(splitCamelCase(key)));

    if (Array.isArray(data[0]))
        return data.map((data) => processKeys(Object.keys(data[0])));
    else return processKeys(Object.keys(data[0]));

}

