<script>
    import { _ } from "svelte-i18n";
    export let parentfunctions;
</script>

{#each parentfunctions as parentfunction,i}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div id="toltip{i}" class="avatar-sm ms-2 cursor-pointer" on:click={parentfunction.function}>
        <span class="avatar-title rounded-circle bg-light font-size-24">
            <i class="mdi {parentfunction.icon} text-primary" />
        </span>
    </div>
{/each}

<style>
    .cursor-pointer {
        cursor: pointer;
    }
</style>
