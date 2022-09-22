import axios from 'axios'
import { Questions } from 'Views/Registration/types'

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

export const yupShortTest = (val: any, checker: boolean) => {
	return val ? (!checker ? false : true) : true
}

export const convertFieldsToSnakeCase = (oldObject: any) => {
	if (oldObject !== undefined) {
		const convertKey = (key: any) =>
			key.replace(/([A-Z])/g, '_$1').toLowerCase()
		const newObject: any = {}
		for (var camel in oldObject) {
			newObject[convertKey(camel)] = oldObject[camel]
		}

		return newObject
	}
	return oldObject
}

export const convertQs = (obj: any) => {
	const container: any = []

	const temp = Object.assign({}, obj)

	if (temp) {
		delete temp['cliaCertification']

		Object.keys(temp).forEach((itm: string) => {
			const extraValues: any = []
			if (temp[itm] !== null && itm !== 'phlebotomist') {
				const questVal = Questions[itm]
				if (itm === 'licensed' && temp['licensed']) {
					temp['phlebotomist'].map((itm: any) => {
						if (itm?.phlebotomistName) {
							extraValues.push(itm?.phlebotomistName)
						}
					})
				}
				container.push({
					[questVal]: {
						answer: temp[itm],
						extra_values: extraValues,
					},
				})
			}
		})
	}
	return container
}

export const checkDuplicates = (apiUrl: string, headers: any) => {
	const promise = new Promise((resolve) => {
		axios
			.get(apiUrl, {
				headers,
			})
			.then((response) => {
				if (response && response.data.count > 0) {
					resolve(false)
				}
				resolve(true)
			})
			.catch(() => {
				resolve(true)
			})
	})
	return promise
}

export const checkObjectIfComplete = (obj: any): boolean => {
	if (obj !== undefined) {
		return Object.values(obj).every((value) => {
			return value !== undefined && value !== '' && value !== null
		})
	}
	return false
}

export const restructureCities = (
	data: any,
	stateChecker: any,
	stateWatch: any
): any => {
	if (!stateChecker) {
		var res: string[] | undefined
		res = data.find((f: any) => f.name === stateWatch)?.cities
		if (res && res.length > 0) {
			const restructured = res?.map((m) => {
				return {
					label: m,
					value: m,
				}
			})
			return restructured
		}
		return []
	}
}

export const checkIfLegalAge = (dob: any): any => {
	if (dob) {
		// const age = new AgeFromDateString(dob).age
		// console.log('dsdsd', age)
		// if (age >= 18) {
		// 	return true
		// }

		var today = new Date()
		var birthDate = new Date(dob)
		var age = today.getFullYear() - birthDate.getFullYear()
		var m = today.getMonth() - birthDate.getMonth()
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--
		}
		console.log('age', age)
		return age >= 18
	}
	return false
}
