<script lang="ts">
	import exclamationIcon from '$images/exclamation_icon.svg';

	export let isError: boolean;
	export let description: string;
</script>

<main
	class={`border rounded-lg ${isError ? 'bg-red-100 border-red-400' : 'bg-green-100 border-green-600'}`}
>
	{#if isError}
		<img src={exclamationIcon} alt="Exclamation Icon" />
	{/if}
	<div class="desc">{description}</div>
</main>

<style>
	main {
		padding: 12px;
		display: flex;
		align-items: center;
		gap: 9.67px;
	}
	.desc {
		flex: 1;
		font-size: 12px;
		line-height: 16px;
		color: var(--text-secondary);
	}
</style>
