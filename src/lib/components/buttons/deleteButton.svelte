<script>
    export let onClick;
    import { mdiTrashCanOutline } from '@mdi/js';
	import Mdi from '../materialDesignIcons/mdi.svelte';

</script>

<button class="btn rounded-circle bg-danger fs-5" on:click={onClick}>
    <Mdi size={20} color={"text-light"} path={mdiTrashCanOutline}/>
</button>

<style>
    button{
        height: 44px;
    }
</style>