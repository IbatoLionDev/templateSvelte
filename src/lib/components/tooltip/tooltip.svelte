<!-- AsyncLoader.svelte -->
<script>
  import { onMount, afterUpdate } from 'svelte';
  export let element = 'div';
  export let placement = 'top';
  export let text = 'This is a tooltip';

  const createTooltip = () => {
    if(!element) return
    element.setAttribute('data-bs-toggle', 'tooltip');
    element.setAttribute('data-bs-placement', placement);
    element.setAttribute('data-bs-title', text);
    new bootstrap.Tooltip(element);
  };

  onMount(async () => {
    if (typeof element === 'string') {
      // Si 'element' es un ID, espera a que el DOM esté listo y luego busca el elemento
      await new Promise(requestAnimationFrame);
      element = document.getElementById(element);
    } 
    createTooltip();
  });
  afterUpdate(createTooltip);
</script>

