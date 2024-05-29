export const setValue = (val: string | null | undefined, defValue = '-') => {
	if (val === '' || val === null || val === undefined || val === '0') return defValue;

	return val;
};
