<script>
    import { page } from "$app/stores";
    const countWord = 100;
    let words = Array(countWord).fill($page.status);

    function randomPosition() {
        return {
            left: `${Math.random() * 100}vw`,
            top: `${Math.random() * 100}vh`,
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
            <span
                style="left: {randomPosition().left}; top: {randomPosition()
                    .top}; animation-delay: {randomDelay()}; font-size: {randomFontSize()};"
                >{word}</span
            >
        {/each}
    </div>
</div>

<div
    class="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-light"
>
    <div class="stack" style="--stacks: 3;">
        <h1 style="--index: 0;" class="display-1 mb-4 slide-in-from-left">
            {$page.status}
        </h1>
        <h1 style="--index: 1;" class="display-1 mb-4 slide-in-from-left">
            {$page.status}
        </h1>
        <h1 style="--index: 2;" class="display-1 mb-4 slide-in-from-left">
            {$page.status}
        </h1>
    </div>

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
        0% {
            transform: rotate(0deg) translateX(50px) rotate(0deg);
            opacity: 0;
        }
        50% {
            transform: rotate(180deg) translateX(50px) rotate(180deg);
            opacity: 0.3;
        }

        100% {
            transform: rotate(360deg) translateX(50px) rotate(360deg);
            opacity: 0;
        }
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

    .stack {
        display: grid;
        grid-template-columns: 1fr;
    }

    .stack h1 {
        font-weight: bold;
        grid-row-start: 1;
        grid-column-start: 1;
        font-size: 4rem;
        --stack-height: calc(100% / var(--stacks) - 1px);
        --inverse-index: calc(calc(var(--stacks) - 1) - var(--index));
        --clip-top: calc(var(--stack-height) * var(--index));
        --clip-bottom: calc(var(--stack-height) * var(--inverse-index));
        clip-path: inset(var(--clip-top) 0 var(--clip-bottom) 0);
        animation:
            stack 340ms cubic-bezier(0.46, 0.29, 0, 1.24) 1 backwards
                calc(var(--index) * 120ms),
            glitch 2s ease infinite 2s alternate-reverse;
    }

    .stack h1:nth-child(odd) {
        --glitch-translate: 8px;
    }
    .stack h1:nth-child(even) {
        --glitch-translate: -8px;
    }

    @keyframes stack {
        0% {
            opacity: 0;
            transform: translateX(-50%);
            text-shadow:
                -2px 3px 0 red,
                2px -3px 0 blue;
        }
        60% {
            opacity: 0.5;
            transform: translateX(50%);
        }
        80% {
            transform: none;
            opacity: 1;
            text-shadow:
                2px -3px 0 red,
                -2px 3px 0 blue;
        }
        100% {
            text-shadow: none;
        }
    }

    @keyframes glitch {
        0% {
            text-shadow:
                -2px 3px 0 red,
                2px -3px 0 blue;
            transform: translate(var(--glitch-translate));
        }
        2% {
            text-shadow:
                2px -3px 0 red,
                -2px 3px 0 blue;
        }
        4%,
        100% {
            text-shadow: none;
            transform: none;
        }
    }
</style>
