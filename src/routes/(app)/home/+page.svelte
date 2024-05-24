<script>
 
    import ConfirmModal from "$lib/components/modals/confirmModal.svelte";
import { _ } from "svelte-i18n";
	const object = {
		dog: "jorge",
		cat: "michi"
	}
	object.map((item)=>{
		console.log(item)
	})
	
</script>

<div  class="card  ">
	<div class="card-body p-5">
		<h1 class="mx-auto text-primary mb-5 text-center font-weight-bold">{$_("home.title")}</h1>
		<div class="row">
			<div class="col-12 col-sm-4">
				<p >
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ultrices massa, et
					feugiat ipsum consequat id. Vestibulum ante ipsum primis in faucibus orci luctus et
					ultrices posuere cubilia curae; Sed at condimentum metus, vitae fringilla tortor.
				</p>
			</div>
			<div class="col-12 col-sm-4">
				<p>
					Phasellus at nunc eget ligula tristique commodo. Mauris purus sem, blandit ac iaculis nec,
					fermentum vel quam. Nulla facilisi. Proin in velit mauris. Nunc congue, justo nec pretium
					elementum, libero justo aliquet enim, at ullamcorper risus ligula in neque.
				</p>
			</div>
			<div class="col-12 col-sm-4">
				<p>
					Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
					Proin vitae lectus sit amet purus bibendum mattis. Curabitur quis risus eget arcu laoreet
					cursus a sit amet dolor.
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	p {
		
		text-align: center;
	}
</style>
