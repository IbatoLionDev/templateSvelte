<script>
	import SesionForm from "../components/sesionForm.svelte";

	
</script>

<SesionForm endpoint={"login"} method={"POST"} title={"Inicio de sesión"} btnName={"Iniciar sesión"} switchView={{href: "/register" , title: "Crear cuenta"}}/>
