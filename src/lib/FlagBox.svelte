<script lang="ts">
	import exclamationIcon from '$images/exclamation_icon.svg';

	export let description: string;
</script>

<main>
	<img src={exclamationIcon} alt="Exclamation Icon" />
	<div class="desc">{description}</div>
</main>

<style>
	main {
		background: #fbe7e9;
		border: 1px solid #d70c24;
		border-radius: 8px;
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
