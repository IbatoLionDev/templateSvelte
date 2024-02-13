<script>
    import { fly } from 'svelte/transition';
    import { notificationMessage } from "$lib/store/store";
</script>

{#if $notificationMessage.message}
        <div
            class="alert alert-{$notificationMessage.type} position-fixed bottom-0 end-0 m-5"
            role="alert"
            in:fly={{x: 500, duration: 500}}
            out:fly={{x: 500, duration: 1000}}
        >
            {$notificationMessage.message}
        </div>  
{/if}
