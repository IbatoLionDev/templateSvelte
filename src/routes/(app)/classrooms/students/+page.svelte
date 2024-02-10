<script>
    import DeleteModal from "$lib/components/modals/deleteModal.svelte";
    import PlusModal from "$lib/components/modals/plusModal.svelte";
    import AdvanceTable from "$lib/components/tables/AdvanceTable.svelte";
    import { Api } from "$lib/utilities/api";
    import { onMount } from "svelte";
    import {classroom} from '$lib/store/store';

    let dataTable;
    let openConfirmModal = false;
    let openPlusModal = false;
    let load
    let id;
    let endpoint = "student";
    let method;
    let title;
    let inputData = [
        { name: "name", type: "text", title: "Name" },
       
    ];
    const idClassroom = $classroom.id 

    onMount(() => {
        getData();
    });

    async function getData() {
        
        load = false
        dataTable = await Api(`${endpoint}/${idClassroom}`, "GET");
        load = true
    }
    async function deleteItems() {
        await Api(`${endpoint}/${id}`, "DELETE");
        getData();
    }

    async function deleteFunction(event) {
        id = event.detail.id;
        openConfirmModal = false;
        setTimeout(() => {
            openConfirmModal = true;
        }, 10);
    }
    function editFunction(event) {
        id = (`/${event.detail.id}`) ;
        title = "Edit student";
        method = "PUT";
        openPlusModal = false;
        setTimeout(() => {
            openPlusModal = true;
        }, 10);
    }
    function addFunction() {
        id = `/${idClassroom}`;
        title = "Create student";
        method = "POST";
        openPlusModal = false;
        setTimeout(() => {
            openPlusModal = true;
        }, 10);
    }
</script>

{#key dataTable}
    <AdvanceTable
    {load}
        {dataTable}
        on:action1={deleteFunction}
        on:action2={editFunction}
        on:plus={addFunction}
        paramId={"id"}
        title={"Student"}
        linkChild="/sites/generalInformation"
        preId={true}
        addLink={"/sites/new"}
        defaultRot={20}
    />
{/key}

{#key openConfirmModal}
    <DeleteModal on:confirm={deleteItems} isOpen={openConfirmModal} />
{/key}
{#key openPlusModal}
    <PlusModal
    on:submit={getData}
        isOpen={openPlusModal}
        {endpoint}
        {method}
        {id}
        {title}
        {inputData}
    />
{/key}
