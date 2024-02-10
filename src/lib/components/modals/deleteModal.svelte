<script>
	import { onMount } from "svelte";
	export let isOpen = false;
	import { fade } from "svelte/transition";
	import { createEventDispatcher } from 'svelte';
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
	
	function ConfirmDelete() {
		modal.hide()
        dispatch('confirm')
	}
</script>

<div
	id="myModal"
	bind:this={modal}
	class="modal rounded"
	tabindex="-1"
	transition:fade={{ duration: 150 }}
>
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<!-- Cabecera del modal -->
			<div class="modal-header">
				<h5 class="modal-title" id="tituloModal">Delet</h5>
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
			<div class="modal-body">Do you want delete?</div>
			<!-- Pie de página del modal -->
			<div class="modal-footer">
				<button
					on:click={ConfirmDelete}
					type="button"
					class="btn btn-primary">Yes</button
				>
			</div>
		</div>
	</div>
</div>

<style>
</style>
