<script>
    import { getRole } from "$lib/utilities/cookies";
    import { onMount } from "svelte";
    import ChangeTheme from "../changeTheme/changeTheme.svelte";

	let role
	onMount(()=>{
		 role = getRole()
		 console.log(role);

	})
</script>

<header>
	<nav class="navbar navbar-expand-sm">
		<div class="container">
			<a class="nav-link" href="/home">
				<img src="/logo.jpeg" alt="logo" width="80px" height="40px" />
			</a>

			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon" />
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto mb-lg-0" />
				<form class="d-flex">
					<ul class="navbar-nav me-auto align-items-center mb-lg-0">
						<li class="nav-item me-3">
							<!-- svelte-ignore a11y-missing-attribute -->
							<a class="nav-link" role="button"> <ChangeTheme/>  </a>
						</li>
					{#if role == "admin"}
						<li class="nav-item me-3">
							<a class="nav-link" href="/admin" role="button"> Admin </a>
						</li>
						{/if}
						

						<li class="nav-item me-3">
							<a class="nav-link" href="/classrooms" role="button"> Classrooms </a>
						</li>

				
						<li class="nav-item me-3 d-flex">
							<span class=" rounded-circle button-plus">
								<a href="/pay">
									<i class="nav-link mdi mdi-plus-circle-outline text-light p-0" />
								</a>
							</span>
						</li>

						<li class="nav-item me-3 dropdown">
							<a
								class="nav-link"
								href="#"
								role="button"
								id="dropdownMenuLink"
								data-bs-toggle="dropdown"
								aria-expanded="false"
							>
								<img class="rounded-circle" width="35px" height="35px" src="/avatar.png" alt="" />
							</a>

							<ul class="dropdown-menu dropdown-menu-end dropdown-menu-xxl-start" aria-labelledby="dropdownMenuLink">
								<li><a class="dropdown-item" href="/account">Editar Perfil</a></li>
								<li><a class="dropdown-item" href="/logOut">Cerrar sesión</a></li>
							</ul>
						</li>
					</ul>
				</form>
			</div>
		</div>
	</nav>
</header>

<style>
	.nav-link {
		font-weight: bold;
	}
	.button-plus {
		font-size: 30px;
	}

	
</style>
