<script lang="ts">
	export let type: HTMLButtonElement['type'] = 'submit';
	export let buttonAction = () => {};
	export let disabled = false;
	export let width = '100%';
	export let height = '48px';
	export let fontSize = '16px';
	export let color = '#66788a';

	function typeAction(node: HTMLButtonElement) {
		node.type = type;
	}
</script>

<button
	use:typeAction
	on:click={buttonAction}
	{disabled}
	class="rounded-lg border border-transparent font-bold transition-colors bg-gray-100 hover:border-orange-500 focus:outline focus:outline-4 disabled:pointer-events-none disabled:bg-gray-100"
	style={`width: ${width}; height: ${height}; font-size: ${fontSize}; color: ${color};`}
>
	<slot />
</button>
