<script>
    import { _ } from "svelte-i18n";
    import { Datatable, Th } from "@vincjo/datatables/remote";
    import { fixTranslate } from "$lib/utilities/utilities";
    import AddButton from "$lib/components/buttons/addButton.svelte";
    import CustomButton from "$lib/components/buttons/customButton.svelte";
    import ButtonsAction from "./buttonsAction.svelte";
    import { formatValue } from "./tableUtilities";
    export let tableParams;
    export let selected;
    export let rows;
    export let handler;
    export let isAllSelected;
    console.log($rows);

    const getKey = (i) => Object.keys(tableParams.dataTable)[i];
</script>

<div class="card">
    <div class="card-title p-3 ps-4">
        <div class="d-flex align-items-center">
            {#if tableParams.title}
               <h4 class="me-3"> {tableParams.title}</h4>
            {/if}
            {#if tableParams.parentfunctions}
                <CustomButton parentfunctions={tableParams.parentfunctions} />
            {/if}
            {#if tableParams.add}
                <AddButton addLink={tableParams.addLink} />
            {/if}

            {#if $selected.length > 0}
                {#key rows}
                    <ButtonsAction
                        selected={$selected}
                        {rows}
                        noSelectDelete={tableParams.noSelectDelete}
                        dispachMensaje={tableParams.dispachMensaje}
                        deleteFunction={tableParams.deleteFunction}
                    />
                {/key}
            {/if}
        </div>
    </div>
    <div class="card-body table-responsive">
        <Datatable
            {handler}
            selectedCount={tableParams.selectable}
            search={tableParams.search}
            pagination={tableParams.pagination}
            rowsPerPage={tableParams.rowsPerPage}
        >
            <table
                class=" table table-hover table-bordered dt-responsive nowrap"
            >
                <thead>
                    <tr>
                        {#if tableParams.selectable}
                            <th
                                style="width: 45px;"
                                class="selection text-center"
                            >
                                <input
                                    type="checkbox"
                                    on:click={() => handler.selectAll()}
                                    checked={$isAllSelected}
                                />
                            </th>
                        {/if}

                        {#each tableParams.header as h, i}
                            <Th orderBy={getKey(i)} {handler}>{$_(fixTranslate(h))}</Th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    {#each $rows as row, i}
                        <tr class:table-secondary={$selected.includes(row.ID)}>
                            {#if tableParams.selectable}
                                <td class="selection text-center">
                                    <input
                                        type="checkbox"
                                        on:click={() => handler.select(row.ID)}
                                        checked={$selected.includes(row.ID)}
                                    />
                                </td>
                            {/if}

                            {#each Object.values(row).map(String) as v, j}
                                {#if v.includes("icon")}
                                    <td
                                        style="width: {(v.split('#').length -
                                            1) *
                                            40 +
                                            'px'}; text-align : center"
                                    >
                                        {#each v.split("#") as icon, i}
                                            {#if i > 0 && i < v.split("#").length - 1}
                                                <button
                                                    class="ms-1 me-1 border-0 rounded-circle bg-light font-size-20"
                                                    on:click={() =>
                                                        tableParams.dispachMensaje(
                                                            row.ID,
                                                            i,
                                                        )}
                                                >
                                                    <i class={icon} />
                                                    {v.split("$")[i]}
                                                </button>
                                            {/if}
                                        {/each}
                                    </td>
                                {:else if v.includes("checkBox")}
                                    <td>
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id={`checkbox-${i}-${j}`}
                                            checked={v.split("#")[0] == "true"}
                                            data-checked={v.split("#")[0] ==
                                                "true"}
                                            on:change={tableParams.checkboxHandleChange(
                                                event,
                                                v,
                                            )}
                                        />
                                        <label
                                            class="form-check-label ms-2"
                                            for={`checkbox-${i}-${j}`}
                                        >
                                            <span class="unchecked text-danger"
                                                >Denied</span
                                            >
                                            <span class="checked text-success"
                                                >Permitted</span
                                            >
                                        </label>
                                    </td>
                                {:else if Object.values(row).map(String).length - 1 > j}
                                    <td on:click={tableParams.rowClick(row)}>
                                        {formatValue(tableParams.header[j]) +
                                            $_(v)}
                                    </td>
                                {/if}
                            {/each}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </Datatable>
    </div>
</div>

<style>
  thead {
    background: #fff;
}


:global(th), tbody td {
    padding: 8px 16px;
    border-bottom: 1px solid #e0e0e0;
}

:global(th) {
    text-align: left;
    color: #424242;
    background-color: #f5f5f5 !important;
}

tbody td {
    border: 1px solid #f5f5f5;
}

tbody tr, tr {
    transition: all 0.2s;
    cursor: pointer !important;
}

input[type="checkbox"] ~ .form-check-label .unchecked,
input[type="checkbox"]:checked ~ .form-check-label .checked {
    display: inline;
}

input[type="checkbox"] ~ .form-check-label .checked,
input[type="checkbox"]:checked ~ .form-check-label .unchecked {
    display: none;
}

</style>
