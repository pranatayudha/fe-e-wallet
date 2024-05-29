import { setThousandsSeparator, switchSeparator } from './ThousandsSeparator';

export const setValue = (val: string | null | undefined, defValue = '-') => {
	if (val === '' || val === null || val === undefined || val === '0') return defValue;

	return val;
};

export const setEmptyTo = (val: string | null | undefined, defValue = '-'): string => {
	if (val === '' || val === null || val === undefined) return defValue;

	return `${val}`;
};

export const setToFixed = (value: number) => {
	const isToFixed = value % 1 !== 0;

	return isToFixed ? value.toFixed(2) : value;
};

export const setNominalView = (
	value?: string,
	prm?: { defValue?: string; prefix?: string; suffix?: string }
) => {
	const clearVal = setEmptyTo(value, prm?.defValue ?? '');

	const nominalInThousands = Number(clearVal);
	if (isNaN(nominalInThousands)) return prm?.defValue ?? '-';

	return (
		setThousandsSeparator(
			switchSeparator(`${setToFixed(nominalInThousands)}`, '.'),
			prm?.prefix ?? 'Rp'
		) + (prm?.suffix ?? '')
	);
};
