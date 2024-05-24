<script>
    export let subscribemodal = false;
    export let img;
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    console.log(img);
    function tog_standard() {
        subscribemodal = false;
        dispatch("closeModal");
    }
</script>
<!--
<Modal
    isOpen={subscribemodal}
    className="modal-dialog modal-dialog-centered modal-fullscreen "
>
    <div class="modal-content modal-fullscreen bg-transparent">
        <div class="modal-header border-bottom-0">
            <button type="button"  class="btn-close rounded-circle bg-light"  on:click={tog_standard} />
            
        </div>
        <div
            class="modal-body d-flex align-items-center justify-content-center"
        >
            <div class="mb-4">
                {#if img}
                    <img src={img} alt="" class="w-100 h-100" />
                {/if}
            </div>
        </div>
    </div>
</Modal>
-->

