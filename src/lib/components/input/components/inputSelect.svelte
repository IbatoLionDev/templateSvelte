<script>
    import { _ } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let input;

 
</script>

<select
    on:change={(event) =>
        dispatch("selectOption", {
            value: event.target.value,
        })}
    name={input.key}
    class="form-select"
    required={input.required}
>
    {#if input.placeholder}
        <option value="" disabled selected hidden>{input.placeholder}</option>
    {/if}
    {#each input.option as o}
        <option value={o} selected={o === input.value}>{$_(o)}</option>
    {/each}
</select>
