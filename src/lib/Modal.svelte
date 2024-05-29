<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let showModal = false;

	const dispatch = createEventDispatcher();
	const onModalClick = () => dispatch('toggleModal');
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class:backdrop={showModal}
	on:click|self={onModalClick}
	on:keyup={() => {}}
	on:keydown={() => {}}
	on:keypress={() => {}}
>
	<slot />
</div>

<style>
	.backdrop {
		position: fixed;
		z-index: 1000;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.6);
		mix-blend-mode: normal;
		overflow: auto;
	}
</style>
