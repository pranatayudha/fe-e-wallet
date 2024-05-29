<script lang="ts">
	export let label = '';
	export let name = '';
	export let type: string;
	export let suffixClass = '';
	export let placeholder: string;
	export let value = '';
	export let autocomplete = 'off';
	export let required = true;
	export let disabled = false;

	let inputRef: HTMLInputElement;

	const typeAction = (node: HTMLInputElement) => {
		node.type = type;
	};

	const toggleShowPassword = () => {
		if (inputRef!.type === 'password') {
			suffixClass = 'eye_close';
			return (inputRef!.type = 'text');
		}
		suffixClass = 'eye_open';
		inputRef!.type = 'password';
	};
</script>

{#if label}
	<p class="text-base font-semibold text-primary leading-6 mb-2">{label}</p>
{/if}

<div class="relative flex items-center">
	<input
		use:typeAction
		bind:value
		bind:this={inputRef}
		{name}
		{placeholder}
		{autocomplete}
		{required}
		{disabled}
		class="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 text-base font-normal text-gray-800 focus:outline-none focus:border-orange-500"
	/>

	<div class="absolute inset-y-0 right-0 flex items-center pr-3">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<i
			class={`${suffixClass === 'eye_close' ? 'eye_close' : 'eye_open'} cursor-pointer`}
			on:click={toggleShowPassword}
		></i>
	</div>
</div>
