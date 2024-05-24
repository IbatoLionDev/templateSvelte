<script>
    import SpinnerComponent from "../spinner/SpinnerComponent.svelte";

    import { Row, Card, CardBody, ListGroup, ListGroupItem } from "sveltestrap";
    import { _ } from "svelte-i18n";
    import { editForm, load } from "$lib/utilities/utilities";
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
    import AdvanceTable from "../tables/AdvanceTable.svelte";
    import Modal from "$lib/components/modal/modal.svelte";

    export let viewList;
    const headerTypes = [
        "$_('yard.services.table.header.Service name')",
        "$_('yard.services.table.header.Description')",
        "$_('yard.services.table.header.Action')",
    ];

    const keysTypes = ["serviceName", "description"];
    const dispatch = createEventDispatcher();
    let edit = false;
    let title;
    let openConfirmModal = false;
    let unAssignId;
    let command = {
        action: "Services.servicesFeatures",
        data: {},
        errorMessage: null,
        successMessage: null,
        state: { order: "asc", sort: "serviceId" },
    };

    onMount(async () => {});

    function getTitleFromUrl() {
        const pathParts = window.location.pathname.split("/");
        let lastPart = pathParts[pathParts.length - 1];

        if (!isNaN(lastPart)) {
            // Si el último elemento es un número, toma el elemento anterior y añade 'Edit'
            title = "Edit " + camelCasetoWords(pathParts[pathParts.length - 2]);
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

    function closeModal() {
        openConfirmModal = false;
    }
    getTitleFromUrl();
    function assignServices(event) {
        const id = event.detail.id;
        dispatch("assign", { id: id, operation: "assign" });
        edit = editForm(null, edit);
    }
    function unAssignServices(event) {
        openConfirmModal = true;
        unAssignId = event.detail.id;
    }

    function deleteServices() {
        openConfirmModal = true;
    }
    function deleteFunction() {
        dispatch("assign", { id: unAssignId, operation: "unAssign" });
        edit = editForm(null, edit);
    }
    function reset() {
        setTimeout(() => {
            edit = !edit;
        }, 10);
    }
</script>

<AdvanceTable
    keys={keysTypes}
    header={headerTypes}
    title={$_("yard.services.table.title")}
    sectionAction={"icon#mdi mdi-plus text-success#mdi mdi-minus text-danger#$$"}
    noSelectDelete={true}
    defaultRot={20}
    add={false}
    paramId={"serviceId"}
    on:action1={assignServices}
    on:action2={unAssignServices}
    pagination={false}
    rowsPerPage={false}
    search={false}
    {command}
/>

{#if !$load}
    <form>
        <Card>
            <CardBody>
                <div class="d-flex mb-4">
                    <h4 class="card-title mb-3">
                        {$_('yard.services.title')}
                    </h4>
                </div>
                <Row>
                    <ListGroup class="mb-2">
                        {#each viewList as item}
                            <ListGroupItem
                                ><span>
                                    <span
                                        class="mdi mdi-{item.image} text-info me-2 text-lg"
                                    /><span>{$_(item.name)}</span></span
                                ></ListGroupItem
                            >
                        {/each}
                    </ListGroup>
                </Row>
            </CardBody>
        </Card>
    </form>
{:else}
    <SpinnerComponent />
{/if}

{#key openConfirmModal}
    <Modal
        subscribemodal={openConfirmModal}
        title={"Delete services"}
        body={$_('yard.services.modal.body')}
        on:closeModal={closeModal}
        on:confirm={deleteFunction}
    />
{/key}
