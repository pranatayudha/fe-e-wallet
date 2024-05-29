<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { navigating, page } from '$app/stores';
	import { setNominalView } from '$helpers/DefaultValue';
	import flipLogo from '$images/flip_logo.png';
	import BaseDialog from '$lib/BaseDialog.svelte';
	import LoadingDialog from '$lib/LoadingDialog.svelte';
	import LoadingIndicator from '$lib/LoadingIndicator.svelte';
	import walletIcon from '@material-design-icons/svg/outlined/account_balance_wallet.svg';
	import homeIcon from '@material-design-icons/svg/outlined/home.svg';
	import sendIcon from '@material-design-icons/svg/outlined/send.svg';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let isLoading = false;
	let path: string;
	let showConfirmLogoutDialog = false;
	let goStraightToSelectedMenu = true;
	let selectedMenu: any;

	let menus = [
		{
			name: 'Dashboard',
			icon: homeIcon,
			path: '/dashboard'
		},
		{
			name: 'Transfer Money',
			icon: sendIcon,
			path: '/transfer'
		},
		{
			name: 'Top Up Balance',
			icon: walletIcon,
			path: '/top-up'
		}
	];

	const getPath = (currentPath: any) => (path = currentPath);

	const toggleConfirmLogoutDialog = () => (showConfirmLogoutDialog = !showConfirmLogoutDialog);

	const selectMenu = (selected: any) => {
		selectedMenu = selected;

		if (goStraightToSelectedMenu) gotoSelectedMenu();
	};

	const gotoSelectedMenu = () => {
		goto(selectedMenu.path);
	};

	$: ({ balance } = data);
	$: getPath($page.url.pathname);
</script>

<LoadingDialog show={isLoading} />

<BaseDialog
	show={showConfirmLogoutDialog}
	title="Are you sure wanna logout?"
	description=""
	cancelButtonLabel="No"
	confirmButtonLabel="Yes"
	confirmWithFormAction={true}
	formIdForSubmitOutsideFormTag="logout"
	formaction="?/logout"
	imageSource={null}
	on:close={toggleConfirmLogoutDialog}
	on:cancel={toggleConfirmLogoutDialog}
/>

<aside class="fixed top-20 h-full z-20 w-1/5 shadow-md">
	<div class="mx-3 my-6 p-4 border rounded-lg bg-white">
		<p class="text-sm">Balance</p>
		<p class="text-md font-semibold">{setNominalView(balance.toString())}</p>
	</div>

	<ul class="flex flex-col">
		{#each menus as menu}
			<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
			<li
				class={`flex items-center h-14 pl-6 mx-3 cursor-pointer gap-4 ${path.includes(menu.path) ? 'bg-orange-300 border rounded text-white' : 'text-slate-500'}`}
				on:click={() => selectMenu(menu)}
				on:keypress={() => {}}
			>
				<img src={menu.icon} alt="Menu Item" />
				<div>
					{@html menu.name}
				</div>
			</li>
		{/each}
	</ul>
</aside>

<main class="pt-20">
	<header class="fixed top-0 right-0 w-full h-20 bg-white shadow-md z-10 flex items-center px-4">
		<img id="flip-logo" src={flipLogo} alt="Flip Logo" class="pl-6 h-10" />

		<div class="flex items-center ml-auto gap-4">
			<form
				id="logout"
				method="POST"
				action="?/logout"
				use:enhance={() => {
					isLoading = true;
					showConfirmLogoutDialog = false;

					return async ({ update }) => {
						isLoading = false;
						update({ reset: false });
					};
				}}
				class="flex items-center gap-6"
			>
				<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span
					class="p-2 text-orange-600 cursor-pointer font-medium"
					on:click={toggleConfirmLogoutDialog}
					on:keypress={() => {}}
				>
					Logout
				</span>
			</form>
		</div>
	</header>

	<div class="place-content-center">
		{#if !!$navigating}
			<LoadingIndicator />
		{:else}
			<slot />
		{/if}
	</div>
</main>
