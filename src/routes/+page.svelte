<script lang="ts">
	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import LoadingIndicator from '$lib/LoadingIndicator.svelte';

	export let data: PageData;

	$: ({ user } = data);

	onMount(() => {
		if (!user) {
			goto('/login');
		} else {
			goto('/dashboard');
		}
	});
</script>

<LoadingIndicator />
