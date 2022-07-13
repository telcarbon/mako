export const isEmpty = (value: any) => {
	return (
		typeof value === "undefined" ||
		value === null ||
		(typeof value === "object" && Object.keys(value).length === 0) ||
		(typeof value === "string" && value.trim().length === 0)
	);
};