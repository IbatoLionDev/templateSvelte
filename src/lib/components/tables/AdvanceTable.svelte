<script>
	import { DataHandler, Datatable, Th } from "@vincjo/datatables";
	import { createEventDispatcher, onMount } from "svelte";
	import SpinnerComponent from "../spinner/SpinnerComponent.svelte";
	import AddButton from "../buttons/addButton.svelte";
	import AdvanceTableEmpy from "./tableComponents/advanceTableEmpy.svelte";
	import { mdiTrashCanOutline, mdiPencilOutline } from "@mdi/js";

	import Mdi from "../materialDesignIcons/mdi.svelte";
    import DeleteModal from "../modals/deleteModal.svelte";
	const dispatch = createEventDispatcher();
	export let dataTable;
	export let add = true;
	export let title;
	export let header;
	export let defaultRot = 5;
	export let selectable = true;
	export let search = true;
	export let pagination = true;
	export let rowsPerPage = true;
	export let load
	let rows;
	let handler;
	let total;
	console.log(load);
	if (dataTable?.length > 0) {
		header = Object.keys(dataTable[0]);

		handler = new DataHandler(dataTable, {
			rowsPerPage: defaultRot,
			totalRows: total,
			selectBy: "id",
		});
		rows = handler.getRows();

		
	}
	function dispatchAdd() {
		dispatch("plus")

	}

	function dispachMensaje(id, actionid) {
		dispatch(`action${actionid}`, {
			id: id,
		});
	}
</script>

{#if load}
	{#if dataTable?.length > 0}
		<div class="card mb-5">
			<div class="card-body table-responsive">
				<div class="h4 card-title d-flex align-items-center px-4 mb-2">
					{#if title}
						{title}
					{/if}
					{#if add}
						<div class="ms-3">
							<AddButton onClick={dispatchAdd}/>
						</div>
					{/if}
					
				</div>
				<Datatable
					{handler}
					selectedCount={selectable}
					{search}
					{pagination}
					{rowsPerPage}
				>
					<table class="table table-hover table-bordered">
						<thead>
							<tr>
								
								{#if header}
									{#each header as h, i}
										<th>{h}</th>
									{/each}
									<th class="text-center">Actions</th>
								{/if}
							</tr>
						</thead>
						<tbody>
							{#each $rows as row, i}
								<tr
									
								>
									{#each Object.entries(row) as [key, value], j}
										<td on:click={() =>
											dispatch("select", {data:row})}
									>
											{value}
										</td>
									{/each}

									<!--icons-->
									<td class="text-center">
										<button
											class="ms-1 me-1 border-0 rounded-circle bg-light font-size-20"
											on:click={() =>
												dispachMensaje(row.id, 1)}
										>
											<Mdi
												size={17}
												color="text-danger"
												path={mdiTrashCanOutline}
											/>
										</button>
										<button
											class="ms-1 me-1 border-0 rounded-circle bg-light font-size-20"
											on:click={() =>
												dispachMensaje(row.id, 2)}
										>
											<Mdi
												size={17}
												color="text-warning"
												path={mdiPencilOutline}
											/>
										</button>
									</td> 	
								</tr>
							{/each}
						</tbody>
					</table>
				</Datatable>
			</div>
		</div>
	{:else}
		<AdvanceTableEmpy addFunction={dispatchAdd} />
	{/if}
{:else}
	<SpinnerComponent />
{/if}



<style>
	thead {
		background: #fff;
	}
	th {
		text-align: left;
		padding: 8px 16px;

		border-bottom: 1px solid #e0e0e0;
	}
	tbody td {
		border: 1px solid #e0e0e0;
		padding: 4px 16px;
	}
	tbody tr {
		transition: all, 0.2s;
	}
	tr {
		cursor: pointer !important;
	}
</style>
