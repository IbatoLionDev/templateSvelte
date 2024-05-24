<script>
    import { _ } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    import Mdi from "$lib/components/materialDesignIcons/mdi.svelte";
    import { mdiEye, mdiEyeOff } from "@mdi/js";
    export let input;

    const dispatch = createEventDispatcher();

    let passwordView = false;

    function checkDisable(name) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const input = document.getElementsByName(name)[0];
                resolve(input?.disabled);
            }, 10);
        });
    }

    function selectInput(event) {
        dispatch("selectInput", { input: event.target });
    }

    function validateInput(event, pattern, validate = $_("validate.empty")) {
        const inputElement = event.target;
        if (!pattern?.test(inputElement.value)) {
            inputElement.setCustomValidity($_(fixTranslate(validate)));
            inputElement.reportValidity(); // Muestra el mensaje de error
            inputElement.checkValidity();
        } else inputElement.setCustomValidity("");
    }

    function getInputType(type) {
        if (type != "password") return type;
        else if (passwordView) return "text";
        else return "password";
    }
</script>

<div class="input-group mb-3">
    {#if input.groupText}
        <span class="input-group-text">{input.groupText}</span>
    {/if}

    {#if input.groupTextIcon}
        <span class="input-group-text" id={input.tooltipId}>
            <button
                type="button"
                on:click={() =>
                    input.funcion(document.getElementById(input.name))}
                class={`btn bg-transparent cursor-pointer d-flex align-items-center p-0 ${input.groupTextIcon}`}
                style="outline: none; box-shadow: none; border: none;"
            ></button>
        </span>
    {/if}

    <input
        on:click={selectInput}
        on:input={(event) =>
            validateInput(event, input.pattern, input.validateMensaje)}
        accept="image/*"
        class="form-control"
        type={getInputType(input.type)}
        step={input.step}
        value={input.value ? input.value : ""}
        id={input.name}
        name={input.key}
        required={input.required}
        placeholder={input.placeholder || ""}
        readonly={input.readonly}
    />
    {#if input.type == "password"}
        <span class="input-group-text">
            <button
                class={`btn bg-transparent cursor-pointer d-flex align-items-center p-0`}
                style="outline: none; box-shadow: none; border: none;"
                on:click={() => (passwordView = !passwordView)}
                type="button"
            >
                <Mdi path={passwordView ? mdiEye : mdiEyeOff} />
            </button>
        </span>
    {/if}
</div>

{#await checkDisable(input.key) then disbale}
    {#if disbale}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            on:dblclick={() => dispatch("dbclick")}
            class="position-absolute w-100 h-100 top-0 start-0 z-1"
            style="user-select: none;"
        ></div>
    {/if}
{/await}


<style>
	.dollar {
		position: relative;
		top: 37px;
		left: 4px;
	}
	
</style>
