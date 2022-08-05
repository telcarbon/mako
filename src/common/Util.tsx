import axios from 'axios'
import { IQuestionnareInfo, Questions } from 'Views/Registration/types'

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

// export const camelToUnderscore = (oldObj: any) => {
// 	const convertKey = (key: any) => key.replace(/([A-Z])/g, '_$1').toLowerCase()
// 	const newObject = {}
// 	Object.keys(oldObj).forEach(k => {
// 		newObject[convertKey(camel)] = oldObj[camel]
// 	});
// 	for (var camel in oldObj) {
// 		newObject[convertKey(camel)] = oldObj[camel]
// 	}
// }

export const camelToUnderscore = (oldObject: any) => {
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
	console.log('container', container)
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
