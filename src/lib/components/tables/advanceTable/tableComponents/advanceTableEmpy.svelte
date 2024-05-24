<script>
    import AddButton from "$lib/components/buttons/addButton.svelte";
    import { _ } from "svelte-i18n";
    export let addLink;
    export let title
</script>

<div class="card">
    {#if addLink}
        <div class=" card-title p-3 d-flex align-items-center">
            <h4>{title}</h4>
            <AddButton {addLink} />
        </div>
    {/if}
    <div class="card-body">
        <div class="p-4">
            <div class="mx-auto text-center text-primary">
                
                <span class="mdi mdi-emoticon-sad-outline font-size-21"></span>
                <h4>{$_('global-translation.Data Empy')}</h4>  
            </div>
        </div>
    </div> 
</div>

<style>
 
    span{
        font-size: 30px;
    }
</style>
