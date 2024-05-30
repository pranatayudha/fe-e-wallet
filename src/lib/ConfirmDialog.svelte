<script lang="ts">
	import ClearIcon from '$images/clear_icon.svg';
	import ButtonOutline from '$lib/ButtonOutline.svelte';
	import Modal from '$lib/Modal.svelte';
	import { createEventDispatcher } from 'svelte';

	export let fitContent: boolean = false;
	export let show: boolean;
	export let title: string;
	export let titleCenter: boolean = false;
	export let description: string;
	export let confirmButtonLabel: string;
	export let cancelButtonLabel: string = '';
	export let cancelButtonLabelColor: string = 'text-orange-600';
	export let cancelButtonColor: string = 'bg-white';
	export let cancelButtonBorderColor: string = 'border-orange-600';
	export let confirmButtonColor: string = 'bg-orange-600';
	export let confirmButtonLabelColor: string = 'text-white';
	export let confirmButtonBorderColor: string = 'border-orange-600';
	export let padding: string = 'p-6';

	const dispatch = createEventDispatcher();

	const close = () => dispatch('close');
	const cancel = () => dispatch('cancel');
	const confirm = () => dispatch('confirm');
</script>

<Modal showModal={show}>
	<main class="flex justify-center content-center my-40" style={show ? '' : 'display:none'}>
		<div
			class={`m-0 bg-white rounded-lg ${!fitContent ? 'w-1/2 max-w-lg' : ''} ${fitContent ? 'w-fit-content' : ''} ${padding}`}
		>
			<div class="flex flex-row w-full">
				<h3 class="flex-grow w-full text-2xl font-bold font-nunito" class:text-center={titleCenter}>
					{@html title}
				</h3>
				<button type="button" class="border-none bg-none cursor-pointer" on:click={close}>
					<img src={ClearIcon} alt="clear" />
				</button>
			</div>

			<div class="pt-8 pb-6 box-border">
				<p class="text-base font-nunito leading-6" class:hidden={description == ''}>
					{@html description}
				</p>
				<slot />
			</div>

			<div class="flex gap-4 justify-center">
				<div class="w-full" class:hidden={cancelButtonLabel == ''}>
					<ButtonOutline
						type="button"
						label={cancelButtonLabel}
						color={cancelButtonLabelColor}
						bgColor={cancelButtonColor}
						borderColor={cancelButtonBorderColor}
						buttonAction={cancel}
					/>
				</div>

				<ButtonOutline
					type="button"
					label={confirmButtonLabel}
					color={confirmButtonLabelColor}
					bgColor={confirmButtonColor}
					borderColor={confirmButtonBorderColor}
					buttonAction={confirm}
				/>
			</div>
		</div>
	</main>
</Modal>
