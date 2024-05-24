<script>
    import { _ } from "svelte-i18n";

    import { Row, Col, Card, CardBody, Form } from "sveltestrap";

    import InputBuilder from "$lib/components/input/inputBuilder.svelte";
    import {
        setData,
        goBack,
        actInput,
        fixTranslate,
    } from "$lib/utilities/utilities";
    import ButtonsSetForm from "$lib/components/buttons/buttonsSetForm.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import { page } from "$app/stores";
    const dispatch = createEventDispatcher();
    export let option;
    export let selectedOptions;
    export let Quantity;
    export let title;
    export let dispatchMsg;
    export let nameSection;
    export let inputData;
    export let action;
    export let id;
    export let idType;
    export let item;

    export let back;


    let validated;
    let form;

    if (item || option)
        inputData = inputData.map((input) => actInput(input, item, option));

    function getTitleFromUrl() {
        if (title) return;
        const pathParts = window.location.pathname.split("/");

        title = `${$_("form.create.new")} ${$_(`modelName.${camelCasetoWords(pathParts[pathParts.length - 2])}`)} `;

        function camelCasetoWords(camelCase) {
            return camelCase
                .replace(/([A-Z])/g, " $1") // inserta un espacio antes de las letras mayúsculas
                .replace(/^./, (str) => str.toUpperCase()); // convierte la primera letra a mayúscula
        }
    }

    getTitleFromUrl();

    onMount(() => {
        form = document.getElementById(`createForm${title}`);
    });

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
    async function setD(event) {
        event.preventDefault();

        if (dispatchMsg) {
            dispatch(dispatchMsg, { event: event });
            return;
        }
        await setData(event.target.elements, action, id, idType);
        goBack();
    }

    selectOption();

    function reset() {
        const elements = Array.from(form.elements);
        let empty;
        elements.forEach((element) => {
            if (element.value && element.tagName !== 'SELECT' ) empty = true;
        });
        if (!empty) goBack($page, "forceBack");
    }


    
</script>

<Card>
    <CardBody>
        <h4 class="card-title">
            {title}
        </h4>
        <Form id={`createForm${title}`} {validated} on:submit={setD}>
            <Row>
                {#each inputData as input, i}
                    {#if i && i % 2 == 0}
                        <h4 class="card-title mt-3">
                            {$_(fixTranslate(nameSection[i / 2 - 1]))}
                        </h4>
                    {/if}
                    <InputBuilder
                        on:selectInput
                        on:base64
                        on:selectOption={selectOption}
                        on:date
                        values={input}
                    />
                {/each}
            </Row>

            <ButtonsSetForm
                on:reset={reset}
                on:changeQuantity
                {Quantity}
                on:validate={validate}
            />
        </Form>
    </CardBody>
</Card>
