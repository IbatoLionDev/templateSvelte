<script>
    import { _ } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    export let edit;
    export let noSave;
    let save;
    const dispatch = createEventDispatcher();
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
</script>

<div class="float-end">
    {#key save}
    {/key}
    {#if edit == false}
        {#if $load && save}
            <Spinner class="ms-4" size="sm" color="primary" />
        {:else}
            <button
                class="btn btn-primary"
                on:click={() => dispatch("reset", { value: true })}
                type="button">{$_("yards.view.generalInformation.edit")}</button
            >
        {/if}
    {:else}
        <button
            class="btn btn-secondary"
            on:click={() => dispatch("reset", { value: true })}
            type="button">{$_("yards.view.generalInformation.Cancel")}</button
        >
        {#if !noSave}
            <button
                class="btn btn-primary"
                type="submit"
                on:click={saveFuntion}
            >
                {$_("yards.view.generalInformation.save")}</button
            >
        {/if}
    {/if}
</div>
