<script>
	import DeleteButton from "$lib/components/buttons/deleteButton.svelte";
	import { Api } from "$lib/utilities/api";
	import { goto } from "$app/navigation";
    import { fromDataToJson } from "$lib/utilities/fromData";

	async function deleteUser() {
		await Api("users/token", "DELETE");
		goto("/login");
	}

	async function submit(event) {
		const formData = fromDataToJson(new FormData(event.target));
		await Api("users/token", "PUT", formData);
		goto("/home");
	}
</script>

<div class="card">
	<div class="card-body p-5">
		<div class="row align-items-center">
			<div class="col-6">
				<img
					src="/avatar.png"
					class="rounded-circle"
					alt="Avatar"
					width="50"
					height="50"
				/>
			</div>
			<div class="col-6 text-end">
				<DeleteButton onClick={deleteUser} />
			</div>
		</div>

		<form on:submit|preventDefault={submit} class=" mt-3">
			<div class="mb-3">
				<label for="email" class="form-label">Correo electrónico</label>
				<input
					type="email"
					class="form-control"
					id="email"
					name="email"
					placeholder="Introduce tu correo"
				/>
			</div>
			<div class="mb-3">
				<label for="password" class="form-label">Contraseña</label>
				<input
					type="password"
					class="form-control"
					id="password"
					name="password"
					placeholder="Introduce tu contraseña"
				/>
			</div>
			<div class="d-grid gap-2 d-md-flex justify-content-md-end">
				<button class="btn btn-primary" type="submit">Editar</button>
			</div>
		</form>
	</div>
</div>
