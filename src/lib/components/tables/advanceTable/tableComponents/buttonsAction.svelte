<script>
    	import { fade } from "svelte/transition";

    export let selected = [];
    export let rows = [];
    export let noSelectDelete = false;
    export let dispachMensaje = () => {};
    export let deleteFunction = () => {};
    console.log(selected);
</script>

    <div class="ms-auto" transition:fade>
        {#each Object.values($rows[0]).map(String) as v, j}
            {#if v.includes("icon")}
                {#each v.split("#") as icon, i}
                    {#if i > 0 && i < v.split("#").length - 1}
                        <button
                            class="btn btn-rounded bg-light font-size-20 ms-2"
                            on:click={() =>
                                dispachMensaje(
                                    selected,
                                    i,
                                )}
                        >
                            <i class={icon} />
                            {v.split("$")[i]}
                        </button>
                    {/if}
                {/each}
            {/if}
        {/each}
        {#if !noSelectDelete}
            <button
                class="btn btn-rounded bg-danger font-size-17 ms-2"
                on:click={deleteFunction}
            >
                <i
                    class=" mdi mdi-trash-can-outline text-light"
                />
            </button>
        {/if}
    </div>
