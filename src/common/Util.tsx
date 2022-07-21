export const isEmpty = (value: any) => {
	return (
		typeof value === 'undefined' ||
		value === null ||
		(typeof value === 'object' && Object.keys(value).length === 0) ||
		(typeof value === 'string' && value.trim().length === 0)
	)
}

export const isNumericDigits = (val: any) => {
	const reg = new RegExp('^\\d+$')
	// const reg = new RegExp('^[0-9]+$');
	return reg.test(val)
}

export const checkLength = (val: any, len: number): boolean => {
	return val.length === len
}

export const ifNullOrEmpty = (val: any): boolean => {
	return val === '' || val === null
}
