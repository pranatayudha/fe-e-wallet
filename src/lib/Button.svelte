<script lang="ts">
	export let type: HTMLButtonElement['type'] = 'submit';
	export let label: string;
	export let buttonAction = () => {};
	export let disabled = false;
	export let confirmWithFormAction = false;
	export let formIdForSubmitOutsideFormTag: string | null = null;
	export let formMethod = 'POST';
	export let formaction = '';
	export let customClass = '';
	export let iconButton = '';

	function typeAction(node: HTMLButtonElement) {
		node.type = type;
	}
</script>

{#if confirmWithFormAction}
	<form method={formMethod} class="w-full">
		<button
			class={`w-full h-12 text-white rounded-lg border border-transparent font-bold transition-colors ${customClass} bg-orange-600 hover:border-orange-700 focus:outline focus:outline-4`}
			use:typeAction
			{disabled}
			form={formIdForSubmitOutsideFormTag}
			{formaction}
		>
			{label}
		</button>
	</form>
{:else}
	<button
		class={`w-full h-12 text-white rounded-lg border border-transparent font-bold transition-colors ${customClass} bg-orange-600 hover:border-orange-700 focus:outline focus:outline-4 flex justify-center items-center`}
		use:typeAction
		on:click={buttonAction}
		{disabled}
	>
		{#if iconButton}
			<!-- svelte-ignore a11y-missing-attribute -->
			<img class="align-middle w-6 h-6 pr-2" src={iconButton} />
		{/if}

		{label}
	</button>
{/if}
