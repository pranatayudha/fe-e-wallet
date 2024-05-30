<script lang="ts">
	export let type: HTMLButtonElement['type'] = 'submit';
	export let buttonAction = () => {};
	export let width = 'w-[80%]';
	export let height = 'h-12';
	export let fontSize = '16px';
	export let color = 'text-orange-600';
	export let bgColor = 'bg-white';
	export let borderColor = 'border-orange-600';
	export let borderStyle = 'solid';
	export let padding = '0';
	export let label = '';
	export let withLabel: boolean = true;
	export let iconButton = '';
	export let iconWidth = '8px';
	export let iconHeight = '8px';

	function typeAction(node: HTMLButtonElement) {
		node.type = type;
	}
</script>

<button
	use:typeAction
	on:click={buttonAction}
	class={`border-2 rounded-lg font-bold transition-colors focus:outline-none focus-visible:ring-4 disabled:pointer-events-none flex justify-center items-center ${width} ${height} ${fontSize} ${color} ${borderColor} ${padding} ${bgColor} ${borderStyle}`}
>
	{#if iconButton}
		<img
			class="align-middle w-6 h-6"
			width={iconWidth}
			height={iconHeight}
			src={iconButton}
			alt={iconButton}
		/>
	{/if}

	{#if withLabel}
		{label}
	{/if}
</button>
