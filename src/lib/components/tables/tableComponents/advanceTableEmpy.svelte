<script>
    import AddButton from "../../buttons/addButton.svelte";
    export let addFunction;
</script>

<div class="card">
    {#if addFunction}
        <div class="card-header p-3">
            <AddButton onClick={addFunction} />
        </div>
    {/if}
    <div class="card-body custom-padding">
        <div class="mx-auto text-center text-primary">
            <span class="mdi mdi-emoticon-sad-outline font-size-21"></span>
            <h4>Data empy</h4>
        </div>
    </div>
</div>

<style>
    .font-size-21 {
        font-size:  30px;
    }
    .custom-padding{
        padding: 100px;
    }
</style>
