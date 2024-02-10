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

	.animationStart{
		animation: startIcon 1s forwards;

	}
	svg {
		fill: currentColor !important;
	}

	@keyframes startIcon{
		0%{
			transform: translateY(100%);
			opacity: 0;

		}
		100%{
			transform: translateY(0);
			opacity: 1;


		}
	}
</style>
