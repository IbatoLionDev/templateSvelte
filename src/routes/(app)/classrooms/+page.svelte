<script>
    import DeleteModal from "$lib/components/modals/deleteModal.svelte";
    import PlusModal from "$lib/components/modals/plusModal.svelte";
    import AdvanceTable from "$lib/components/tables/AdvanceTable.svelte";
    import { Api } from "$lib/utilities/api";
    import { onMount } from "svelte";
    import {classroom} from '$lib/store/store';
    import { goto } from "$app/navigation";

    let dataTable;
    let openConfirmModal = false;
    let openPlusModal = false;
    let load;
    let id;
    let endpoint = "classroom";
    let method;
    let title;
    let inputData = [
        { name: "name", type: "text", title: "Name" },
        { name: "year", type: "number", title: "Year" },
        { name: "capacity", type: "number", title: "Capacity" },
    ];

    onMount(() => {
        getData();
    });

    async function getData() {
        load = false
        dataTable = await Api(endpoint, "GET");
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
        title = "Edit classroom";
        method = "PUT";
        openPlusModal = false;
        setTimeout(() => {
            openPlusModal = true;
        }, 10);
    }
    function select(event) {
        classroom.set(event.detail.data);
        goto("/classrooms/students")
    }
    function addFunction() {
        id = "";
        title = "Create classroom";
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
        on:select={select}
        paramId={"id"}
        title={"Classroom"}
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
