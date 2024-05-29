<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import flipLogo from '$images/flip_logo.png';
	import Button from '$lib/Button.svelte';
	import FlagBox from '$lib/FlagBox.svelte';
	import Input from '$lib/Input.svelte';
	import LoadingDialog from '$lib/LoadingDialog.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let isLoading: boolean = false;

	const handleLoginAction: SubmitFunction = async () => {
		isLoading = true;

		return async ({ update }) => {
			isLoading = false;
			update({ reset: false });
		};
	};

	const toRegister = () => goto('register');
</script>

<LoadingDialog show={isLoading} />

<main>
	<header class="absolute top-0 right-0 left-0">
		<div class="fixed top-0 right-0 w-full z-3 h-20 bg-white shadow flex items-center">
			<div class="flex-1 ml-4 flex items-center justify-start gap-2">
				<img id="flip-logo" src={flipLogo} alt="Flip Logo" width="50px" />
			</div>
		</div>
	</header>

	<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
		<div class="text-center">
			<span class="text-5xl">Flip Test App</span>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="mt-5 mb-8 text-lg">
				Do not have account?
				<span class="font-bold text-orange-600 cursor-pointer" on:click={toRegister}
					>Register Here</span
				>.
			</div>
		</div>

		{#if form?.success === false}
			<div class="mb-2">
				<FlagBox description={form?.message ?? ''} />
			</div>
		{/if}

		<form method="POST" action="?/login" use:enhance={handleLoginAction}>
			<Input label="Username" name="username" type="text" placeholder="Your username here" />

			<Button label="Log In" customClass="mt-4" />
		</form>

		<div class="mt-20">© 2024 PT. Fliptech Lentera Inspirasi Pertiwi</div>
	</div>
</main>
