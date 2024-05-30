<script lang="ts">
	import { setEmptyTo, setNominalView } from '$helpers/DefaultValue';
	import type { TransactionHistory } from '$types/Wallet';
	import EmptyData from '$lib/EmptyData.svelte';

	export let transactionHistory: TransactionHistory[];
</script>

{#if transactionHistory.length > 0}
	<div class="table-container">
		<table>
			<thead>
				<tr>
					<th>No</th>
					<th>Description</th>
					<th>Amount</th>
					<th>Created At</th>
				</tr>
			</thead>
			<tbody>
				{#each transactionHistory as history, i}
					{@const amountIsMinus = history.amount.toString().includes('-')}
					<tr>
						<td>{i + 1}</td>
						<td>{setEmptyTo(history.description, '-')}</td>
						<td class={`font-bold ${amountIsMinus ? 'text-red-600' : 'text-green-600'}`}
							>{setNominalView(history.amount.toString(), { defValue: '-' })}</td
						>
						<td>{setEmptyTo(history.created_at, '-')}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<EmptyData title="No transaction data yet" desc="You have not made any transactions yet" />
{/if}

<style>
	* {
		margin: 0;
		padding: 0;
	}

	.table-container {
		overflow-x: auto;
	}

	table {
		border-collapse: collapse;
		width: 100%;
		border: 1px solid #ddd;
		margin-bottom: 30px;
	}

	tr {
		height: 48px;
		cursor: pointer;
	}

	th,
	td {
		padding: 16px;
		text-align: left;
		border-bottom: 1px solid #ddd;
	}

	th {
		background-color: #f8f9fa;
		font-weight: 700;
		font-size: 14px;
		color: var(--text-primary);
		cursor: default;
	}

	tr:hover {
		background-color: #f8f9fa;
	}
</style>
