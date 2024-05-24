<script>
	import Mdi from "../materialDesignIcons/mdi.svelte";
    import { mdiPlusCircleOutline } from '@mdi/js';
    import { goto } from '$app/navigation';
    const pathname = window.location.pathname
    console.log(pathname);
</script>

<button class="btn rounded-circle bg-primary fs-5" on:click={()=> goto(`${pathname}/new`)} >
    <Mdi size={20} color={"text-light"} path={mdiPlusCircleOutline}/>
</button>


<style>
    button{
        height: 44px;
    }
</style>