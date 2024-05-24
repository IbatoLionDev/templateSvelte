<script>
    import TableController from "$lib/components/tables/advanceTable/tableController.svelte";



    const command = {
        endpoint:"classroom",
        data: ""
    }
   
</script>

    <TableController
        {command}
        title={"Classroom"}
        preId={true}
    />


