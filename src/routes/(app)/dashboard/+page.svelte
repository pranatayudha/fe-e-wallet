<script lang="ts">
	import ErrorDialog from '$lib/ErrorDialog.svelte';
	import MenuLayout from '$lib/MenuLayout.svelte';
	import type { ActionData, PageData } from './$types';
	import TableTransactionHistory from './(components)/TableTransactionHistory.svelte';

	export let data: PageData;
	export let form: ActionData;

	$: ({ transactionHistory } = data);
</script>

{#if form?.success === false}
	<form method="POST" action="?/clearCookies">
		<ErrorDialog errorMessage={form?.message ?? ''} buttonLabel="Login Again" />
	</form>
{/if}

<MenuLayout title="Transaction History">
	<TableTransactionHistory {transactionHistory} />
</MenuLayout>
