<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/Button.svelte';
	import ConfirmDialog from '$lib/ConfirmDialog.svelte';
	import ErrorDialog from '$lib/ErrorDialog.svelte';
	import InputForm from '$lib/InputForm.svelte';
	import LoadingDialog from '$lib/LoadingDialog.svelte';
	import MenuLayout from '$lib/MenuLayout.svelte';
	import {
		confirmContentSchemeInitial,
		type ConfirmContentScheme
	} from '$types/ConfirmContentScheme';
	import sendIcon from '@material-design-icons/svg/outlined/send.svg';
	import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
	import { saveConfirm, successToNext } from '../(helpers)/ConfirmContent';
	import type { ActionData } from './$types';

	export let form: ActionData;

	const currentPath = $page.url.pathname;

	let contentConfirm: ConfirmContentScheme = confirmContentSchemeInitial;
	let isLoading: boolean,
		isShowConfirmDialog: boolean = false;
	let transferSubmit: HTMLButtonElement;

	let username: string = '',
		amount: string = '';

	const errorEnhanceSave = (result: ActionResult) => {
		contentConfirm = {
			codeContent: 'failed',
			confirm: false,
			success: false,
			title: 'Failed',
			desc: 'error' in result ? result.error.message : 'Internal error'
		};
		toggleConfirmDialog();
	};

	const onSubmitTransaction = () => {
		if (contentConfirm.codeContent === 'failed') {
			toggleConfirmDialog();
		}

		if (contentConfirm.codeContent === 'successToNext') {
			goto(currentPath, { replaceState: true, invalidateAll: true });
		}

		toggleConfirmDialog();
		transferSubmit.click();
	};

	const parseTransferRes = async (response: any) => {
		if (!response.success) {
			contentConfirm = {
				codeContent: 'failed',
				confirm: false,
				success: false,
				title: 'Failed',
				desc: response?.message
			};
			toggleConfirmDialog();

			return;
		}

		contentConfirm = successToNext(response.message);
		toggleConfirmDialog();
	};

	const toggleConfirmDialog = () => (isShowConfirmDialog = !isShowConfirmDialog);

	const transferEnhance: SubmitFunction = ({ formData }) => {
		isLoading = true;

		formData.append(
			'transferData',
			JSON.stringify({
				username,
				amount
			})
		);

		return async ({ result }) => {
			isLoading = false;
			switch (result.type) {
				case 'success':
					const dataResult: any = result.data;
					const transferRes = dataResult.transferRes;
					parseTransferRes(transferRes);
					break;
				default:
					errorEnhanceSave(result);
			}
		};
	};
</script>

{#if form?.success === false}
	<form method="POST" action="?/clearCookies">
		<ErrorDialog errorMessage={form?.message ?? ''} buttonLabel="Login Again" />
	</form>
{/if}

<LoadingDialog show={isLoading} />

<ConfirmDialog
	show={isShowConfirmDialog}
	title={contentConfirm.title}
	description={contentConfirm.desc}
	confirmButtonLabel={contentConfirm.textBtnPrimary ?? 'OK'}
	cancelButtonLabel={contentConfirm.textBtnSecondary ?? ''}
	on:close={toggleConfirmDialog}
	on:cancel={toggleConfirmDialog}
	on:confirm={onSubmitTransaction}
/>

<form method="POST" action="?/transfer" use:enhance={transferEnhance}>
	<button type="submit" hidden={true} bind:this={transferSubmit} />
</form>

<MenuLayout title="Transfer Money">
	<div class="w-1/2">
		<InputForm
			type="text"
			name="username"
			label="Username"
			placeholder="Beneficiary username"
			bind:value={username}
		/>

		<InputForm
			type="text"
			name="amount"
			label="Amount"
			placeholder="Transaction amount"
			withThousandsSeparator={true}
			bind:value={amount}
		/>
		<div class="py-8 pb-6 flex justify-end gap-4">
			<div class="w-1/2">
				<Button
					type="button"
					label="Submit Transaction"
					iconButton={sendIcon}
					buttonAction={() => {
						contentConfirm = saveConfirm;
						toggleConfirmDialog();
					}}
				/>
			</div>
		</div>
	</div>
</MenuLayout>
