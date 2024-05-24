import { unwrapFunctionStore } from 'svelte-i18n';
import { _ } from 'svelte-i18n';
import { writable } from 'svelte/store';

const $_ = unwrapFunctionStore(_)
let ofText;
let rowsSelectedText;
let clearButtonText;

export const dataTableComplete = writable([])
export function changeTranslate( dataTable , handler) {
    if (!dataTable || !handler) return;
    handler.i18n = {
        search: $_("table.search"),
        show: $_("table.show"),
        entries: $_("table.entries"),
        filter: $_("table.filter"),
        rowCount: $_("table.rowCount"),
        noRows: $_("table.noRows"),
        previous: $_("table.previous"),
        next: $_("table.next"),
    };
}

export function translateSelectedInfoPatern(selectedInfoPatern) {
    if (!selectedInfoPatern) return;

    let childNodes = Array.from(selectedInfoPatern.childNodes);
    childNodes.forEach((node, index) => {
        if (node.nodeType === Node.TEXT_NODE) {
            if (index === 2) {
                // El texto 'of'
                node.nodeValue = $_("table.of");
            } else if (index === 4) {
                // El texto 'row(s) selected.'
                node.nodeValue = $_("table.selectedCount");
            }
        }
    });

    translateButtonClearSelection(selectedInfoPatern);
}


export function setSelectedInfoPatern(selectedInfoPatern) {
    if (!selectedInfoPatern) return;
    const textContent = selectedInfoPatern.innerText.split(" ");
    ofText = textContent[1];
    rowsSelectedText = textContent.slice(3).join(" ");
    translateSelectedInfoPatern(selectedInfoPatern);
}


export function translateButtonClearSelection(selectedInfoPatern) {
    setTimeout(() => {
        clearButtonText = selectedInfoPatern.querySelector("button");
        if (clearButtonText) {
            clearButtonText.textContent = $_("table.buttonClear");
        }
    }, 5);
}

export function formatValue(header) {
    const keywords = ["price", "amount"];
    return keywords.some(keyword => header.toLowerCase().includes(keyword)) ? "$" : "";
}
