export const setThousandsSeparator = (nominal: string | null | undefined, prefix = '') => {
	nominal = nominal != null || nominal != undefined ? nominal : '';
	if (nominal == '0.00') {
		return '0.00';
	} else {
		const numberString = nominal.replace(/[^,\d]/g, '').toString();
		const split = numberString.split(',');
		const sisa = split[0].length % 3;
		let rupiah = split[0].substring(0, sisa);
		const ribuan = split[0].substring(sisa).match(/\d{3}/gi);

		if (ribuan) {
			const separator = sisa ? '.' : '';
			rupiah += separator + ribuan.join('.');
		}

		rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
		const negative = nominal.charAt(0) == '-' ? '-' : '';

		return rupiah ? `${prefix}${negative}${rupiah}` : '';
	}
};

export const removeThousandsSeparator = (nominal: string, separator: ',' | '.' = '.') => {
	return nominal == '' ? '0' : nominal.split(separator).join('');
};

export const switchSeparator = (
	number: string | null | undefined,
	toSeparator: ',' | '.' = '.'
) => {
	if (number == null || number == undefined) return '';

	let decimal = '';
	let separator = '';

	const idxComma = number.lastIndexOf(',');
	const idxPoint = number.lastIndexOf('.');

	if (idxComma > idxPoint) {
		decimal = ',';
		separator = '.';
	}

	if (idxPoint > idxComma) {
		decimal = '.';
		separator = ',';
	}

	if (separator != '' && decimal != '' && separator != toSeparator) {
		const numberSplitDecimal = number.split(decimal);
		const numberSplitSeparator = numberSplitDecimal[0].split(separator);

		const reformatSparator = numberSplitSeparator.join(decimal);
		const reformatDecimal = [reformatSparator, numberSplitDecimal[1]].join(separator);

		return reformatDecimal;
	}

	return number;
};
