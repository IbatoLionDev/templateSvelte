<script>
    export let onClick;
	import Mdi from "../materialDesignIcons/mdi.svelte";
    import { mdiPlusCircleOutline } from '@mdi/js';

</script>

<button class="btn rounded-circle bg-primary fs-5" on:click={onClick}>
    <Mdi size={20} color={"text-light"} path={mdiPlusCircleOutline}/>
</button>


<style>
    button{
        height: 44px;
    }
</style>