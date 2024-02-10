<script>
	import SesionForm from "../components/sesionForm.svelte";

</script>

<SesionForm endpoint={"users"} method={"POST"} title={"Registro"} btnName={"Registrarse"} switchView={{href: "/login" , title: "Iniciar Sesión"}}/>
