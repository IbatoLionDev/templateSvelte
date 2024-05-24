<script>
    import InputBuilder from "$lib/components/input/inputBuilder.svelte";
    import { Row, Col, Card, CardBody, Form } from "sveltestrap";
    import { _ } from "svelte-i18n";
    import {
        actInput,
        putForm,
        resetForm,
        editForm,
        goBack,
        fixTranslate,
    } from "$lib/utilities/utilities";
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    import ButtonsEditForm from "$lib/components/buttons/buttonsEditForm.svelte";

    export let nameSection;
    export let inputData;
    export let item;
    export let action;
    export let option;
    export let selectedOptions;
    export let errorMsg;
    export let dispatchMsg;
    export let back;

    let validated = true;

    function validate(event) {
        validated = true;
    }
    const dispatch = createEventDispatcher();
    let edit = true;
    if (item)
        inputData = inputData.map((input) => actInput(input, item, option));
    let elements;
    let fromValues = [];
    let form;
    export let title;
    getTitleFromUrl();

    onMount(async () => {
        form = document.getElementById(`editForm${title}`);
        elements = form.elements;
        for (var i = 0, len = elements.length; i < len; ++i) {
            fromValues[i] = elements[i].value;
        }
        edit = editForm(elements, edit);
    });

    function getTitleFromUrl() {
        if (title) return;
        const pathParts = window.location.pathname.split("/");
        let lastPart = pathParts[pathParts.length - 1];

        if (!isNaN(lastPart)) {
            // Si el último elemento es un número, toma el elemento anterior
            title = camelCasetoWords(pathParts[pathParts.length - 2]);
        } else {
            // Si no, convierte el camelCase a palabras separadas con la primera letra en mayúscula
            title = camelCasetoWords(lastPart);
        }
        function camelCasetoWords(camelCase) {
            return camelCase
                .replace(/([A-Z])/g, " $1") // inserta un espacio antes de las letras mayúsculas
                .replace(/^./, (str) => str.toUpperCase()); // convierte la primera letra a mayúscula
        }
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
    async function submit() {
        event.preventDefault();
        let fixedElements
        const elementsToArray = Array.from(elements).map(
            (input) => input.value,
        );
        const isEqual =
            JSON.stringify(elementsToArray) === JSON.stringify(fromValues);
        if (!isEqual) {
            if (dispatchMsg) {
                ({fromValues,fixedElements} = putForm(fromValues, elements, item));

                dispatch(dispatchMsg, {
                    fromValues,
                    elements: fixedElements,
                });
            } else {
                ({fromValues,fixedElements} = await putForm(
                    fromValues,
                    elements,
                    item,
                    action,
                    null,
                    errorMsg,
                ));
                }

        if (back) goBack();
        }
        edit = editForm(elements, edit);
        let valuesItemArray = [];
        let i = 0;
        inputData.forEach((inputGroup) => {
            inputGroup.forEach((input) => {
                valuesItemArray.push({ key: input.key, value: fromValues[i] });
                i++;
            });
        });
        dispatch("actItem", { value: valuesItemArray });

        
    }
    function AciveForm() {
        console.log("asd");
        if (edit == false) {
            reset();
        }
    }

    function reset() {
        inputData.forEach((inputGroup) => {
            inputGroup.forEach((input) => {
                if (input.type == "multi") {
                    input.value = fromValues[0];
                    inputData = inputData;
                }
            });
        });
        setTimeout(() => {
            edit = editForm(elements, edit);

            resetForm(elements, fromValues);
        }, 10);
    }
    
</script>

<Form id={`editForm${title}`} {validated} bind:this={form} on:submit={submit}>
    <Card>
        <CardBody>
            <h4 class="card-title mb-3">
                { $_(`form.edit`) + " " + $_(`modelName.${title}`)}
            </h4>
            <Row>
                {#key inputData}
                    {#each inputData as input, i}
                        {#if i && i % 2 == 0}
                        <h4 class="card-title mt-3">{$_(fixTranslate(nameSection.shift())) }</h4>
                        {/if}
                     
                            <InputBuilder
                                on:selectOption={selectOption}
                                on:dbclick={AciveForm}
                                on:base64
                                on:date
                                on:selectInput

                                values={input}
                            />
                       
                    {/each}
                {/key}
            </Row>

            <ButtonsEditForm {edit} on:validate={validate} on:reset={reset} />
        </CardBody>
    </Card>
</Form>
