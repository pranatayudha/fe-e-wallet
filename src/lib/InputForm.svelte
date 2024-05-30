<script lang="ts">
	import { setThousandsSeparator } from '$helpers/ThousandsSeparator';

	export let type = '';
	export let label = '';
	export let id = '';
	export let name: string;
	export let placeholder: string | null;
	export let value: string;
	export let autocomplete = 'off';
	export let required = false;
	export let disabled = false;
	export let readonly = false;
	export let withThousandsSeparator = false;
	export let withoutComma = false;
	export let isWhiteBackground = false;
	export let paddingFormItem = '8px';
	export let onChange = () => {};
	export let onInput = () => {};
	export let maxLength: number | null = null;

	$: value = withThousandsSeparator ? setThousandsSeparator(value) : value;

	const onInputTouched = () => {
		delegateOnInput();
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (type === 'number') {
			const keys = ['e', 'E', '+', '-', '.', ','];
			for (let i = 0; i <= keys.length; i++) {
				if (event.key === keys[i]) {
					event.preventDefault();
				}
			}
		}
	};

	const delegateOnInput = () => {
		onInput();
		value = withoutComma ? value.replace(/[^\d]/g, '').toString() : value;
		value = withThousandsSeparator ? setThousandsSeparator(value) : value;

		if (type === 'number' && maxLength != null) {
			if (value.length > maxLength!) {
				value = value.slice(0, maxLength!);
			}

			if (value.length == 2 && name == 'timePeriod') {
				if (value.split('')[0] == '0') {
					value = value.replace(/0/, '');
				}
			}
		}
	};

	const typeAction = (node: HTMLInputElement) => {
		node.type = type;
	};
</script>

<div class="w-full box-border" style="padding:{paddingFormItem};">
	{#if label}
		<div class="label-section flex items-center mb-1">
			<p class="label-form font-nunito font-normal text-xs leading-4 text-primary mr-1">{label}</p>
		</div>
	{/if}

	<div class="relative">
		<input
			use:typeAction
			bind:value
			on:change={onChange}
			on:input={onInputTouched}
			{name}
			{id}
			{placeholder}
			{autocomplete}
			{required}
			{disabled}
			{readonly}
			class="w-full h-12 box-border bg-white border border-gray-400 rounded-md px-4 font-nunito text-lg placeholder:text-gray-400 focus:outline-none focus:border-orange-600 disabled:bg-gray-100 read-only:bg-gray-100"
			class:white-background={isWhiteBackground}
			maxlength={maxLength}
			min={type === 'number' ? 0 : null}
			on:keydown={handleKeyDown}
		/>
	</div>
</div>
