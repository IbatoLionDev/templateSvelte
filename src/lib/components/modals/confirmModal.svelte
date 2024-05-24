<script>
    import { onMount, onDestroy } from 'svelte';
    import { createEventDispatcher } from 'svelte';

    export let title = '';
    export let body = '';
    export let show = false;

    const dispatch = createEventDispatcher();
    let modal;

    onMount(() => {
        const modalEl = document.getElementById('modal');
        modal = new bootstrap.Modal(modalEl);

        modalEl.addEventListener('hide.bs.modal', () => {
            dispatch('cancel');
        });

        modalEl.addEventListener('shown.bs.modal', () => {
            dispatch('open');
        });

        if (show) {
            modal.show();
        }
    });

    function accept() {
        dispatch('accept');
        modal.hide();
    }

    onDestroy(() => {
        if (modal) {
            modal.dispose();
        }
    });

    export function showModal() {
        modal.show();
    }
</script>

<div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md modal-dialog-centered">

        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalLabel">{title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                {body}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" on:click={accept}>Accept</button>
            </div>
        </div>
    </div>
</div>
