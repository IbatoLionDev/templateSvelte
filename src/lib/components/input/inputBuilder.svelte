<script>
	import { _ } from "svelte-i18n";
	import { fixTranslate } from "$lib/utilities/utilities";
	import Tooltip from "../tooltip/tooltip.svelte";
	import InputSelect from "./components/inputSelect.svelte";
	import InputDate from "./components/inputDate.svelte";
	import InputFile from "./components/inputFile.svelte";
	import InputCheckbox from "./components/inputCheckbox.svelte";
	import InputTextarea from "./components/inputTextarea.svelte";
	import InputText from "./components/inputText.svelte";

	export let inputData;

	let inputComponents = {
		select: InputSelect,
		date: InputDate,
		file: InputFile,
		checkbox: InputCheckbox,
		textarea: InputTextarea,
		text: InputText,
	};
</script>

{#each  inputData as input}
	<div class="mb-3 position-relative">
		{#if input.type !== "checkbox"}
			<label for={input.name} class="form-label">
				{$_(fixTranslate(input.name))}
			</label>
		{/if}

		<svelte:component
			this={inputComponents[input.type]}
			{input}
			on:selectOption
			on:selectFile
		/>
	</div>
	<Tooltip element={input.tooltipId} text={input.tooltipBody} />
{/each}
