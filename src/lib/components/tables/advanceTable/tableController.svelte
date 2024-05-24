<script>
	import { _ } from "svelte-i18n";
	import { createEventDispatcher, onMount } from "svelte";
	import SpinnerComponent from "$lib/components/spinner/SpinnerComponent.svelte";
	import { getHeaders } from "$lib/utilities/table";
	import AdvanceTableEmpy from "./tableComponents/advanceTableEmpy.svelte";
	import AdvanceTableHtml from "./tableComponents/advanceTableHtml.svelte";

	import { tableCommand } from "$lib/store/store";
	import { Api } from "$lib/utilities/api";
	import ConfirmModal from "$lib/components/modals/confirmModal.svelte";
    import AdvanceTable from "./AdvanceTable.svelte";

	export let linkChild = "";
	export let dataTable;
	export let add = true;
	export let title;
	export let addLink;
	export let paramId;
	export let keys;
	export let header;
	export let dispatchMsg;
	export let sectionAction;
	export let preId;
	export let defaultRot = 20;
	export let command;
	export let selectable = true;
	export let noSelectDelete;
	export let search = true;
	export let pagination = true;
	export let rowsPerPage = true;
	export let parentfunctions;

	let tableParams = {
		linkChild,
		dataTable,
		add,
		title,
		addLink,
		paramId,
		keys,
		header,
		dispatchMsg,
		sectionAction,
		preId,
		defaultRot,
		command,
		selectable,
		noSelectDelete,
		search,
		pagination,
		rowsPerPage,
		parentfunctions,
	};

	const dispatch = createEventDispatcher();

	let selected;
	let openConfirmModal = false;
	let modalTitle;
	let total;

	tableCommand.set(command);

	onMount(async () => {
		if(!dataTable)
		dataTable = await Api(command.endpoint, "GET", command.data);

		total = dataTable.state?.total || 1;
		 tableParams.dataTable = dataTable;

		if(!header)tableParams.header = getHeaders(dataTable) 
		header = getHeaders(dataTable);

		//dataTableStore.set(dataTable);
		//dataTableComplete.set(JSON.parse(JSON.stringify(dataTable)))
	});

	async function deleteFunction() {
		const count = $selected.length;
		const modalBodyTtem =
			count > 1 ? "modal.body.items" : "modal.body.item";
		modalTitle = `${count} ${$_(`${modalBodyTtem}`)} `;
		openConfirmModal = !openConfirmModal;
	}

	async function deleteItems() {
		
	}

	function closeModal() {
		openConfirmModal = false;
	}
</script>

{#if dataTable}
	{#if dataTable.length > 0}
		<AdvanceTable {tableParams} />
	{:else}
		<AdvanceTableEmpy {title} {addLink} />
	{/if}
{:else}
	<SpinnerComponent />
{/if}

{#key modalTitle}
	<ConfirmModal
		on:accept={deleteItems}
		on:cancel={closeModal}
		show={modalTitle}
		title={modalTitle}
	/>
	=
{/key}
