<script>
    import { _ } from "svelte-i18n";
    import { createEventDispatcher } from "svelte";
    import ImageModal from "$lib/components/modals/imageModal.svelte";

    export let input;

    let subscribemodal = false;
    let imgModal;

    const dispatch = createEventDispatcher();

    function imageFullscreen(event) {
        imgModal = event.target.src;

        // Crea una nueva imagen para comprobar si el src es válido
        let imagenTemporal = new Image();
        imagenTemporal.src = imgModal;

        imagenTemporal.onload = function () {
            // Si la imagen se carga correctamente, entonces el src es válido
            subscribemodal = true;
        };
        imagenTemporal.onerror = function () {
            // Si hay un error al cargar la imagen, entonces el src no es válido
            console.log("El src de la imagen no es válido");
        };
    }

    async function handleFileChange(event, id) {
        const file = event.target.files[0];
        if (!file) return;
        const img = document.getElementById(id);
        const url = URL.createObjectURL(file);
        console.log(url);
        img.src = url;
        dispatch("selectFile", { file, id });
    }
</script>

<input
    on:input={() => handleFileChange(event, input.key)}
    accept="image/*"
    class="form-control"
    type="file"
    id={input.name}
/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<img
    on:click={imageFullscreen}
    class=" thumbnail cursor-pointer img-fluid mt-3"
    id={input.key}
    src=""
    alt=""
/>

{#key subscribemodal}
    <ImageModal
        on:closeModal={() => (subscribemodal = false)}
        img={imgModal}
        {subscribemodal}
    />
{/key}


