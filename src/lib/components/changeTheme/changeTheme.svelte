<script>
    import { mdiWeatherSunny } from "@mdi/js";
    import { mdiWeatherNight } from "@mdi/js";
    import Mdi from "$lib/components/materialDesignIcons/mdi.svelte";
    import { changeTheme } from "$lib/utilities/theme.js";
    import { onMount } from "svelte";

    let themePath = mdiWeatherSunny;
    let themeName

    onMount(()=>{
        themeName = localStorage.getItem("theme") || "light";
        if (themeName == "dark") themePath =  mdiWeatherNight
    })
    function changeThemeFunction() {
        if (themePath == mdiWeatherSunny) {
            themePath = mdiWeatherNight;
            changeTheme("dark");
        } else {
            themePath = mdiWeatherSunny;
            changeTheme("light");
        }
    }
</script>

<button
    on:click={changeThemeFunction}
    class="btn btn-link text-decoration-none p-0 m-0 border-0 bg-transparent"
>
    {#key themePath}
        <Mdi path={themePath} color={"text-light"} />
    {/key}
</button>
