export type ConfirmContentScheme = {
	codeContent?: string;
	confirm: boolean;
	success: boolean;
	title: string;
	desc: string;
	textBtnPrimary?: string;
	textBtnSecondary?: string;
	confirmButtonColor?: string;
};

export const confirmContentSchemeInitial: ConfirmContentScheme = {
	codeContent: '',
	confirm: true,
	success: false,
	title: '',
	desc: '',
	textBtnPrimary: 'Sip, mengerti',
	textBtnSecondary: 'Batalkan'
};
