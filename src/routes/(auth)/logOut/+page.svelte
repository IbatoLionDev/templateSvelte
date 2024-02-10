<script>
	import { deleteToken } from "$lib/utilities/cookies.js";
    import { onMount } from "svelte";
	import { goto } from "$app/navigation";

	
		deleteToken()
		onMount(()=>{
			goto("/login")
		})
</script>

