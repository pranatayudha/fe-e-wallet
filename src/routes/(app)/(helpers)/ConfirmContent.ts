import type { ConfirmContentScheme } from '$types/ConfirmContentScheme';

export const successToNext = (desc: string): ConfirmContentScheme => ({
	codeContent: 'successToNext',
	confirm: false,
	success: true,
	title: `Success`,
	desc: desc,
	textBtnPrimary: `OK`
});

export const saveConfirm: ConfirmContentScheme = {
	confirm: true,
	success: false,
	title: `Confirmation of Data Entry`,
	desc: `Are you sure the data filled in is correct?`,
	textBtnPrimary: `Yes, accordingly`,
	textBtnSecondary: `Abort`
};
