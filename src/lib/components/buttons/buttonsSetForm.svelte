<script>
    import { _ } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";

    let save;
    let saveTimeout = null;
    function saveFuntion() {
        dispatch("validate", { value: true });
        save = true;
        if (saveTimeout) {
            clearTimeout(saveTimeout);
        }
        saveTimeout = setTimeout(() => {
            save = false;
        }, 2000);
    }
    const dispatch = createEventDispatcher();
    export let Quantity;
</script>

<br />
<br />
{#if Quantity}
    <label for="quantityInput">Quantity</label>
{/if}

<div class="d-flex justify-content-center">
    {#if Quantity}
        <div>
            <input
                type="number"
                max="300"
                id="quantityInput"
                on:input={(event) =>
                    dispatch("changeQuantity", { value: event.target.value })}
                class="form-control form-control-sm"
            />
        </div>
    {/if}
    <div class="d-flex ms-auto align-items-center">
        <button
            on:click={() => dispatch("reset", { value: true })}
            type="reset"
            color={"secondary"}>{$_("yards.newYards.cancel")}</button
        >
        <!--  <Spinner class="ms-4" size="sm" color="primary" />-->
        <button
            on:click={saveFuntion}
            class="ms-2"
            type="submit"
            color={"primary"}>{$_("yards.newYards.save")}</button
        >
    </div>
</div>
