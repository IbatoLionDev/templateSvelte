<script>
	export let path;
	export let size = 24;
	export let color = '';
</script>

<div >
	<i class="{color} d-flex animationStart">
		<svg width={size} height="26px" viewBox="0 0 24 24">
			<path d={path} />
		</svg>
	</i>
</div>

<style>


	svg {
		fill: currentColor !important;
	}

	
</style>
