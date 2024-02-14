<script>
	import { onMount } from "svelte";
	export let isOpen = false;
	import { fade } from "svelte/transition";
	import { createEventDispatcher } from 'svelte';
    import { formToJson } from "$lib/utilities/fromData";
    import { Api } from "$lib/utilities/api";

	export let id
	export let title;
	export let method;
	export let endpoint;
	export let inputData
const dispatch = createEventDispatcher();
	
	let modal;
	onMount(() => {
		modal = new bootstrap.Modal(modal);
		console.log(isOpen);
		if (isOpen) {
			modal.show();
			isOpen = false;
		}
	});
	
	async function submit(event) {
		const formData = formToJson(new FormData(event.target))  ;
		
		 await Api(`${endpoint}${id}`, method, formData);
		modal.hide()
		dispatch('submit')
	}
</script>

<div
	bind:this={modal}
	class="modal rounded"
	tabindex="-1"
	transition:fade={{ duration: 150 }}
>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<!-- Cabecera del modal -->
			<div class="modal-header">
				<h5 class="modal-title" id="tituloModal">{title}</h5>
				<button
					on:click={()=>modal.hide()}
					type="button"
					class="btn-close"
					data-dismiss="modal"
					aria-label="Cerrar"
				>
				</button>
			</div>
			<!-- Cuerpo del modal -->
			<form class="p-5" on:submit|preventDefault={submit}>
			{#each inputData as input}
				<div class="form-group mb-3">
					<label class="fw-semibold mb-2" for="{input.name}"
						>{input.title}</label
					>
					<input
						type="{input.type}"
						class="form-control"
						id="{input.name}"
						name="{input.name}"
						placeholder="{input.name}"
					/>
				</div>
			{/each}
		
			<!-- Pie de página del modal -->
			<div class="modal-footer">
				<button
					type="submit"
					class="btn btn-primary">Save</button
				>
				
			</div>
		</form>
		</div>
	</div>
</div>

<style>
</style>
