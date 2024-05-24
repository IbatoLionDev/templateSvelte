<script>
    import { _ } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    export let input;

    function min(PrevDaySelectable) {
        return PrevDaySelectable() || new Date().toISOString().split("T")[0];
    }
</script>

<input
    max={input.maxDate() || null}
    min={min(input.PrevDaySelectable)}
    on:input={(event) =>
        dispatch("date", {
            date: event.target,
        })}
    class="form-control"
    type={input.type}
    value={input.value || ""}
    id={input.name}
    name={input.key}
    required={input.required}
/>
