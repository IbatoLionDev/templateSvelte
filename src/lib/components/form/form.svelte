<script>
    import { _, date } from "svelte-i18n";
    import ButtonsEditForm from "$lib/components/buttons/buttonsEditForm.svelte";

    import InputBuilder from "$lib/components/input/inputBuilder.svelte";
    import {
        fixTranslate,
        objectArrayCompare,
    } from "$lib/utilities/utilities";
    import ButtonsSetForm from "$lib/components/buttons/buttonsSetForm.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import { page } from "$app/stores";
    import { Api } from "$lib/utilities/api";
    import { formToJson } from "$lib/utilities/fromData";
    import { actInput } from "./fromUtilities";
    const dispatch = createEventDispatcher();
    export let option;
    export let selectedOptions;
    export let Quantity;
    export let title;
    export let inputData;
    export let url;
    export let item;
    export let type; //POST || PUT
    
    let validated;
    let form;

    let edit = true;
    if (item)
        inputData = inputData.map((input) => actInput(input, item, option));
    let elements;
    let startValues = [];

    getTitleFromUrl();

    onMount(async () => {
        form = document.getElementById(`Form${title}`);
        elements = form.elements;
        startValues = Array.from(elements).map((input) => input.value);

        edit = editForm(elements, edit);
    });

    if (item || option)
        inputData = inputData.map((input) => actInput(input, item, option));

    function getTitleFromUrl() {
        if (title) return;
        const pathParts = window.location.pathname.split("/");
        let lastPart = pathParts[pathParts.length - 1];
        if (type === "POST") {
            title = `${$_("form.create.new")} ${$_(`modelName.${camelCasetoWords(pathParts[pathParts.length - 2])}`)} `;
        } else {
            if (!isNaN(lastPart)) {
                // Si el último elemento es un número, toma el elemento anterior
                title = camelCasetoWords(pathParts[pathParts.length - 2]);
            } else {
                // Si no, convierte el camelCase a palabras separadas con la primera letra en mayúscula
                title = camelCasetoWords(lastPart);
            }
        }
    }
    function camelCasetoWords(camelCase) {
        return camelCase
            .replace(/([A-Z])/g, " $1") // inserta un espacio antes de las letras mayúsculas
            .replace(/^./, (str) => str.toUpperCase()); // convierte la primera letra a mayúscula
    }

    function validate(event) {
        validated = true;
    }
    function selectOption(event) {
        if (!selectedOptions) return;
        if (!event) {
            inputData = inputData.map((input) =>
                actInput(input, selectedOptions[0], option),
            );
            return;
        }
        let opt = selectedOptions.find((opt) =>
            Object.values(opt).includes(event.detail.value),
        );
        if (opt)
            inputData = inputData.map((input) => actInput(input, opt, option));
    }
    async function putAction() {
        const elementsToArray = Array.from(elements).map(
            (input) => input.value,
        );
        const isEqual = objectArrayCompare(elementsToArray, startValues);

        if (!isEqual) {
            const filterData = elementsToArray.reduce((acc, item, i) => {
                fromValues[i] =
                    elements.type !== "checkbox"
                        ? elements[i].value
                        : elements[i].checked || false;
                if (item.value !== startValues[i]) acc.push(item);

                return acc;
            }, []);
            await Api(url, type, formToJson(filterData));
        }
        edit = editForm(elements, edit);
        if (back) goBack();
    }

    async function submit(event) {
        event.preventDefault();

        if (type === "PUT") {
            await putAction();
        } else {
            await Api(url, type, formToJson(elements));
            if (back) goBack();
        }
    }

    selectOption();

    function reset() {
        const elements = Array.from(form.elements);
        let empty;
        elements.forEach((element) => {
            if (element.value && element.tagName !== "SELECT") empty = true;
        });
        if (!empty) goBack($page, "forceBack");
    }
    console.log(inputData);
</script>

<div class="card">
    <div class="card-title"></div>
    <div class="card-body">
        <form
            class="d-flex"
            id={`createForm${title}`}
            {validated}
            on:submit={submit}
        >
          
                <div class="d-0-0-100 d-md-0-0-50">
                    <InputBuilder
                        on:selectInput
                        on:base64
                        on:selectOption={selectOption}
                        on:date
                        {inputData}
                    />
                </div>
           
            {#if type === "POST"}
                <ButtonsSetForm
                    on:reset={reset}
                    on:changeQuantity
                    {Quantity}
                    on:validate={validate}
                />
            {:else if type === "PUT"}
                <ButtonsEditForm
                    {edit}
                    on:validate={validate}
                    on:reset={reset}
                />
            {/if}
        </form>
    </div>
</div>
