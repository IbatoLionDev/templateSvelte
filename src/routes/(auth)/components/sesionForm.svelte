<script>
	import { goto } from "$app/navigation";
	import { Api } from "$lib/utilities/api.js";
	import { setRole, setToken } from "$lib/utilities/cookies.js";

	import {formToJson} from "$lib/utilities/fromData.js"
	export let btnName;
	export let title;
	export let switchView;
	export let method;
	export let endpoint;

	async function submit(event) {
		const formData = formToJson(event.target)  ;
		
		const response = await Api(endpoint, method, formData);
		setToken(response.token)
		console.log(response.role);
		setRole(response.role)
		goto("/home");
	}
</script>

<div class="card mx-auto">
	<div class="card-body p-5">
		<h3 class=" text-center mb-4 fw-semibold">{title}</h3>

		<form on:submit|preventDefault={submit}>
			<div class="form-group mb-3">
				<label class="fw-semibold mb-2" for="inputEmail"
					>Correo electrónico</label
				>
				<input
					type="email"
					class="form-control"
					id="inputEmail"
					name="email"
					placeholder="Introduce tu correo"
				/>
			</div>
			<div class="form-group mb-4">
				<label class="fw-semibold mb-2" for="inputPassword"
					>Contraseña</label
				>
				<input
					type="password"
					class="form-control"
					id="inputPassword"
					name="password"
					placeholder="Introduce tu contraseña"
				/>
			</div>
			<div class="d-flex">
				<button
					type="submit"
					class="btn btn-primary w-100 mb-4">{btnName}</button
				>
			</div>
		</form>
		<a class="mt-4 text-muted nav-link" href={switchView.href}
			>{switchView.title}</a
		>
	</div>
</div>

<style>
	.card {
		max-width: 400px;
	}
</style>
