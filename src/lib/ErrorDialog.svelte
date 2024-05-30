<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './Button.svelte';
	import Modal from './Modal.svelte';

	export let errorMessage: any;
	export let buttonLabel = 'OK';
	export let confirmWithFormAction = false;
	export let formIdForSubmitOutsideFormTag: any = null;
	export let formMethod = 'POST';
	export let formaction = '';

	const dispatch = createEventDispatcher();
	const handleClick = () => dispatch('onClick');
</script>

<Modal showModal={errorMessage}>
	<main class:!hidden={!errorMessage} class="flex justify-center content-center my-40">
		<div class="dialog w-72 bg-white rounded-lg p-4 text-left">
			<h3 class="font-bold text-xl text-primary">Oops...</h3>
			<div class="divider w-full h-px bg-gray-300 my-2"></div>
			<p class="text-gray-500 mb-6">{errorMessage}</p>

			{#if confirmWithFormAction}
				<Button label="OK" customClass="error-button" type="button" />
			{:else}
				<Button
					label={buttonLabel}
					customClass="orange-button"
					buttonAction={handleClick}
					{confirmWithFormAction}
					{formIdForSubmitOutsideFormTag}
					{formMethod}
					{formaction}
				/>
			{/if}
		</div>
	</main>
</Modal>
