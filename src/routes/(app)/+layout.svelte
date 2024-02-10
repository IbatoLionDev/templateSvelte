<script>
	import HeaderComponent from '$lib/components/header/headerComponent.svelte';
    import { getToken } from '$lib/utilities/cookies';
    import { onMount } from 'svelte';
	import { goto } from "$app/navigation";

	onMount(()=>{
	if(!getToken()) goto("/login")	
	})
</script>

<HeaderComponent />
<div class="container mt-5">
	<slot />
</div>
