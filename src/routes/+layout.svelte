<script>
	import "./styles.scss";
	import { onMount } from "svelte";
	import {changeTheme} from "$lib/utilities/theme.js"
	let theme = "light";
	
	onMount(() => {
		theme = localStorage.getItem("theme") || "light";
		changeTheme(theme);
	});
</script>

<slot />
