<script>
	import { _ } from "svelte-i18n";
	import { fixTranslate } from "$lib/utilities/utilities";
	export let input;
</script>

<div class="form-check form-check-inline">
	<input
		class="form-check-input"
		type="checkbox"
		id={input.name}
		name={input.key}
		value={input.checked}
		bind:checked={input.checked}
	/>
	<label class="form-check-label" for="inlineCheckbox1"
		><span>
			<span class="mdi mdi-{input.image} text-info me-1" /><span
				>{$_(fixTranslate(input.name))}</span
			></span
		></label
	>
</div>
