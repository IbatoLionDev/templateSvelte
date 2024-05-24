<script>
    import { onMount } from 'svelte';
    import SpinnerComponent from '../spinner/SpinnerComponent.svelte';
    export let promises = {};  //Revice un arreglo de promesas de la forma { promesa1 : funcion async , promesa2 : funcion async2}
    
    let data = {};
    let error;
  
    onMount(async () => {
      try {
        const keys = Object.keys(promises);
        const values = await Promise.all(Object.values(promises));
        for (let i = 0; i < keys.length; i++) {
          data[keys[i]] = values[i];
        }
      } catch (e) {
        error = e;
      }
    });
  </script>
  
  {#if error}
    <!--componente que se va a visualizar en caso de error-->

    <div>Ha ocurrido un error: {error.message}</div>
  {:else if !Object.keys(data).length}
  <!--componente que se va a visualizar mientras se cargan los datos-->
    <SpinnerComponent/>
  {:else}
    <!--Se puede acceder a las variables que salen de slot primero declara data:
        <div let:data>
            y usa data de la forma data.(nombre de la key que entra) ejemplo:
    {data.promesa1}
    -->
    <slot {data} />
  {/if}
  