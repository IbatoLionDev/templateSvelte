<script>
	import "./styles.scss";
	import { onMount } from "svelte";
	import {changeTheme} from "$lib/utilities/theme.js"
    import Notification from "$lib/components/notification/notification.svelte";
	import "$lib/translate/i18n"
	let theme = "light";
	
	onMount(() => {
		theme = localStorage.getItem("theme") || "light";
		changeTheme(theme);
	});
</script>

<slot />
<Notification/>
