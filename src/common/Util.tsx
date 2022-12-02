import axios from 'axios'
import { AnyNsRecord } from 'dns'
import moment from 'moment'
import { useEffect } from 'react'
import { Questions } from 'Views/Registration/types'

export const BUSINESS_QUESTIONNAIRE_URL = 'business-questionnaire'
export const BUSINESS_REP_URL = 'business-rep-info'
export const BANKING_INFO_URL = 'banking-info'
export const TERMS_URL = 'terms'

export const WEEKDAY_NAMES = [
	'Sunday',
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
]

export const MONTH_NAMES = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

const BOOKING_DAY_FORMAT = 'YYYY-MM-DD'
export const formatDate = (dt: any) => {
	return moment(dt).format(BOOKING_DAY_FORMAT)
}

/**
 * if date parameter has no value,  date today will be the default
 */
export const transformDateToStringMonth = (date: any) => {
	const dt = date ? date.split('-') : formatDate(new Date()).split('-')
	var monthString = MONTH_NAMES[Number(dt[1] - 1)]

	return `${monthString} ${dt[2]}, ${dt[0]}`
}

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
			key.replace(/([A-Z])/g, '_$1')?.toLowerCase()
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
		var today = new Date()
		var birthDate = new Date(dob)
		var age = today.getFullYear() - birthDate.getFullYear()
		var m = today.getMonth() - birthDate.getMonth()
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--
		}
		return age >= 18
	}
	return false
}

const addBodyClass = (className: string) =>
	document.body.classList.add(className)
const removeBodyClass = (className: string) =>
	document.body.classList.remove(className)

export default function setBodyClass(className: any) {
	useEffect(() => {
		// Set up
		className instanceof Array
			? className.map(addBodyClass)
			: addBodyClass(className)

		// Clean up
		return () => {
			className instanceof Array
				? className.map(removeBodyClass)
				: removeBodyClass(className)
		}
	}, [className])
}

export const getStartAndEndTime = (time: string, duration: number) => {
	const startTime = moment(time, 'hh:mm').format('LT')
	const endTime = moment(time, 'hh:mm').add(duration, 'minutes').format('LT')
	return `${startTime} - ${endTime}`
}

export const disableUrlType = (
	pageStep: Number,
	navigate: any,
	currentStep: Number,
	setCurrentStep: any,
	location: string = ''
) => {
	console.log('test labas')
	if (currentStep !== pageStep) {
		console.log('test loob')
		setCurrentStep(pageStep, () => {
			navigate(`/${location}`)
		})
	}
}
