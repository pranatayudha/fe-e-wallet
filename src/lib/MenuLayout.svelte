<script lang="ts">
	export let title: string;
</script>

<main class="pt-20 pb-16 pr-20">
	<header class="mb-4 md:mb-6">
		<div
			class="selected-menu-title w-full font-bold text-2xl leading-8 text-primary opacity-90 inline-flex"
		>
			{title}
		</div>
	</header>

	<slot />
</main>
