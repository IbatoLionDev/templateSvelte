<script>
    import { slide } from 'svelte/transition';
    export let message;
</script>

<div class="alert alert-success" role="alert" in:slide={{duration: 500, x: 1000}}>
    {message}
</div>
