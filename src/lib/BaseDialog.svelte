<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Modal from './Modal.svelte';
	import clearIcon from '$images/clear_icon.svg';
	import Button from './Button.svelte';
	import MonochromeButton from './MonochromeButton.svelte';

	export let transformHorizCenter = false;
	export let show: boolean;
	export let title: string;
	export let description: string;
	export let cancelButtonLabel: string;
	export let confirmButtonLabel: string;
	export let confirmWithFormAction = false;
	export let formIdForSubmitOutsideFormTag: any = null;
	export let formMethod = 'POST';
	export let formaction = '';
	export let showImage = false;
	export let imageSource: string | null;
	export let disabled = false;

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');
	const cancel = () => dispatch('cancel');
	const confirm = () => dispatch('confirm');
</script>

<Modal showModal={show}>
	<main
		class={`relative top-1/2 ${transformHorizCenter ? 'transform -translate-y-1/2' : ''}`}
		style={show ? '' : 'display:none'}
	>
		<div class="content w-full max-w-md mx-auto p-6 bg-white rounded-lg text-center">
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<img
				src={clearIcon}
				alt="Clear Icon"
				class="clear float-right cursor-pointer"
				on:click={close}
				on:keypress={() => {}}
			/>

			{#if showImage}
				<div>
					<img src={imageSource} alt="" />
				</div>
			{/if}

			<h3 class="font-bold text-lg text-slate-950 mb-4">{title}</h3>
			<p class="text-sm text-slate-400 leading-5">{description}</p>

			<div class="buttons mt-6 flex gap-2 justify-center">
				{#if cancelButtonLabel !== ''}
					<MonochromeButton buttonAction={cancel}>{cancelButtonLabel}</MonochromeButton>
				{/if}

				<Button
					label={confirmButtonLabel}
					buttonAction={confirm}
					{confirmWithFormAction}
					{formIdForSubmitOutsideFormTag}
					{formMethod}
					{formaction}
					{disabled}
				/>
			</div>
		</div>
	</main>
</Modal>
