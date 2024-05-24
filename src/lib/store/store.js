import { writable } from 'svelte/store';

export const screenWidth = writable()
export const classroom = writable({})
export const notificationMessage = writable({})
export const tableCommand = writable()
export const dataTableStore = writable()

