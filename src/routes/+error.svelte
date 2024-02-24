<script>
    import { page } from "$app/stores";
    const countWord = 100;
    let words = Array(countWord).fill($page.status);
  
    function randomPosition() {
        return {
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`
        };
    }
    function randomDelay() {
        return `${Math.random() * 10}s`;
    }
    function randomFontSize() {
        return `${Math.random() * 2}em`;
    }
</script>

<div class="word-container">
    <div class="word-container">
        {#each words as word}
            <span style="left: {randomPosition().left}; top: {randomPosition().top}; animation-delay: {randomDelay()}; font-size: {randomFontSize()};">{word}</span>
        {/each}
    </div>
</div>

<div
    class="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light"
>
    <h1 class="display-1 mb-4 slide-in-from-left">{$page.status}</h1>
    {#if $page.status === 404}
        <p class="lead slide-in-from-right">
            Lo sentimos, la página que estás buscando no existe.
        </p>
    {:else if $page.status === 500}
        <p class="lead slide-in-from-left">
            Lo sentimos, ha ocurrido un error interno en el servidor.
        </p>
    {:else}
        <p class="lead slide-in-from-right">{$page.error.message}</p>
    {/if}
    <a href="/" class="btn btn-primary mt-4 slide-in-from-top"
        >Volver al inicio</a
    >
</div>

<style>
    @keyframes slide-in-from-top {
        0% {
            transform: translateY(-100%);
        }
        100% {
            transform: translateY(0);
        }
    }

    @keyframes slide-in-from-left {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(0);
        }
    }

    @keyframes slide-in-from-right {
        0% {
            transform: translateX(100%);
        }
        100% {
            transform: translateX(0);
        }
    }

    .word-container span {
        position: absolute;
        font-size: 2em;
        opacity: 0;
        animation: moveAndRotate 10s linear infinite;
    }

    @keyframes moveAndRotate {
        0% { transform: rotate(0deg) translateX(50px) rotate(0deg); opacity: 0; }
        50% { transform: rotate(180deg) translateX(50px) rotate(180deg); opacity: 0.3; }

    100% { transform: rotate(360deg) translateX(50px) rotate(360deg); opacity: 0; }
    }
    .slide-in-from-top {
        animation: slide-in-from-top 0.5s ease-out;
    }

    .slide-in-from-left {
        animation: slide-in-from-left 0.5s ease-out;
    }

    .slide-in-from-right {
        animation: slide-in-from-right 0.5s ease-out;
    }
    body{overflow: hidden;}
</style>
