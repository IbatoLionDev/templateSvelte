<script>
	import { DataHandler } from "@vincjo/datatables/remote";
	import { _ } from "svelte-i18n";
	import { goto } from "$app/navigation";
	import { createEventDispatcher, onDestroy, onMount } from "svelte";
	import { onChangeHandler } from "./state";
	import { locale } from "svelte-i18n";
	import AdvanceTableHtml from "./tableComponents/advanceTableHtml.svelte";
	import {
		changeTranslate,
		dataTableComplete,
		setSelectedInfoPatern,
		translateButtonClearSelection,
		translateSelectedInfoPatern,
	} from "./tableComponents/tableUtilities";
	import {
		tableCommand,
	} from "$lib/store/store";
	

	export let tableParams
	
	const dispatch = createEventDispatcher();
	
	let rows;
	let handler;
	let selected;
	let isAllSelected;
	let total;
	let selectedInfoPatern;

	tableCommand.set(tableParams.command);

		console.log(tableParams.dataTable);

	handler = new DataHandler(tableParams.dataTable, {
			rowsPerPage: tableParams.defaultRot,
			totalRows: total,
			selectBy: "ID",
			i18n: {
				search: $_("table.search"),
				show: $_("table.show"),
				entries: $_("table.entries"),
				filter: $_("table.filter"),
				rowCount: $_("table.rowCount"),
				noRows: $_("table.noRows"),
				previous: $_("table.previous"),
				next: $_("table.next"),
			},
		});
		console.log(handler);
		rows = handler.getRows();
		console.log($rows);
		handler.onChange(onChangeHandler);
		selected = handler.getSelected();
		console.log(selected);
		isAllSelected = handler.isAllSelected();
		setTimeout(() => {
			selectedInfoPatern = document.querySelector("aside.svelte-cwy9hw");
			setSelectedInfoPatern(selectedInfoPatern);
			if (tableParams.parentfunctions?.[0]?.icon) showTooltipHelp(tableParams.parentfunctions[0].icon,tableParams.parentfunctions[0].help,"filterTable")
		}, 100);

		$: {
		if ($selected && $selected.length > 0)
			translateButtonClearSelection(selectedInfoPatern);
	}

	// Suscribirse al cambio de idioma para lograr la reactividad
	const unsubscribe = locale.subscribe((value) => {
		changeTranslate(tableParams.dataTable, handler);
		translateSelectedInfoPatern(selectedInfoPatern);
	});

	function dispachMensaje(id, actionId) {
		dispatch(`action${actionId}`, {
			id
		});
	}

	function rowClick(row) {
		if (tableParams.linkChild) {
			if (!tableParams.preId) {
				goto(tableParams.linkChild + "/" + row.ID);
			} else {
				goto(PreId(row.ID));
			}
		} else if (tableParams.dispatchMsg) {
			let	item
			if(tableParams.paramId) item = $dataTableComplete.find((item)=> item[tableParams.paramId] == row.ID) 
			dispatch(tableParams.dispatchMsg, {
				item,
				id: row.ID,
				element: row,
			});
		}
	}

	function checkboxHandleChange(event,v) {
		let target = event.currentTarget;
		target.setAttribute("data-checked", String(target.checked));
		dispatch("checkBoxChange", {
			value: target.checked,
			id: v.split("#").slice(2).join("#"),
		});
	}

	function PreId(id) {
		let segments = tableParams.linkChild.split("/");
		let lastSegment = segments.pop();
		return [...segments, id, lastSegment].join("/");
	}

	onDestroy(() => {
		unsubscribe();
	});

	tableParams.checkboxHandleChange = checkboxHandleChange
	tableParams.rowClick = checkboxHandleChange
	tableParams.dispachMensaje = dispachMensaje

</script>


	{#if handler}
		<AdvanceTableHtml
			{tableParams}
			{handler}
			{selected}
			{rows}
			{isAllSelected}
		/>
	{/if}
