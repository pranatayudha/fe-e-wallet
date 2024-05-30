<script lang="ts">
	import MenuLayout from '$lib/MenuLayout.svelte';
	import type { PageData } from './$types';
	import TableTransactionHistory from './(components)/TableTransactionHistory.svelte';

	export let data: PageData;

	$: ({ transactionHistory } = data);
</script>

<MenuLayout title="Transaction History">
	<TableTransactionHistory {transactionHistory} />
</MenuLayout>
