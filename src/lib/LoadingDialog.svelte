<script lang="ts">
	import Modal from './Modal.svelte';
	import loadingDots from '$images/loading_dots.gif';

	export let show: boolean;
	export let transformHorizCenter = false;
</script>

<Modal showModal={show}>
	<main
		class="center transform-horiz-center"
		class:transform-horiz-center={transformHorizCenter}
		style={show ? '' : 'display:none'}
	>
		<div class="loader-dialog"><img src={loadingDots} alt="Loading Dots" /></div>
	</main>
</Modal>

<style>
	* {
		margin: 0 auto;
		padding: 0;
	}
	.center {
		margin: 0;
		position: relative;
		top: 50%;
	}
	.transform-horiz-center {
		-ms-transform: translateY(-50%);
		transform: translateY(-50%);
	}
	.loader-dialog {
		margin: 0 auto;
		width: fit-content;
		background: #fff;
		border-radius: 16px;
		padding: 16px;
	}
	.loader-dialog img {
		width: 150px;
	}
</style>
