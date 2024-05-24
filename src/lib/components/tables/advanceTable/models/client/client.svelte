<script>
    import { _ } from "svelte-i18n";
    import AdvanceTable from "$lib/components/tables/AdvanceTable.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    export let parentfunctions
    export let dispatchMsg;
    export let add = true
    export let linkChild = "/clients/generalInformation"
    export let title
    export let selectable = true
    let keys = [
        "clientName",
        "firstName",
        "lastName",
        "phone",
        "email",
        "waitingSpaces",
        "active",
    ];

    let command = {
        action: "Clients.Read",
        data: {active : "app.status.Active"},
        errorMessage: null,
        successMessage: null,
    };

    const header = [
        "$_('client.table.header.companyName')",
        "$_('client.table.header.First name')",
        "$_('client.table.header.Last name')",
        "$_('client.table.header.Contact')",
        "$_('client.table.header.Email')",
        "$_('client.table.header.Waiting spaces')",
        "$_('client.table.header.State')",
    ];

</script>

{#key command}
    <AdvanceTable
        {keys}
        {header}
        {selectable}
        {add}
        {parentfunctions}
        defaultRot={20}
        paramId={"clientId"}
        {title}
        {linkChild}
        preId={true}
        addLink={"/clients/new"}
        {command}
        {dispatchMsg}
        on:selectClient
    />
{/key}
