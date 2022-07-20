export interface IOption {
	id?: number
	label: string
	value: number
}

export enum LocationType {
	PHARMACY = 'Pharmacy',
	CLINIC = 'Clinic',
	MOBILE = 'Mobile',
}

export const locationTypeOptions = [
	{
		id: 1,
		label: LocationType.PHARMACY,
		value: 1,
	},
	{
		id: 2,
		label: LocationType.CLINIC,
		value: 2,
	},
	{
		id: 1,
		label: LocationType.MOBILE,
		value: 3,
	},
]

export const salutationOptions = [
	{
		label: 'Mr',
		value: 'Mr',
	},
	{
		label: 'Mrs',
		value: 'Mrs',
	},
	{
		label: 'Ms',
		value: 'Ms',
	},
	{
		label: 'Miss',
		value: 'Miss',
	},
]

export const bankingTypeOptions = [
	{
		label: 'Savings',
		value: 'Savings',
	},
	{
		label: 'Current',
		value: 'Current',
	},
]


export interface IBusinessInfo {
	businessName: string
	typeOfLocation: number
	addressLineOne: string
	addressLineTwo: string
	email: string
	phoneNumber: string // temporary with + sign???
	city: string
	state: string
	zip: string
	country: string
	npiNumber: string
	ncpdpNumber: string
}

export interface IBusinessRepInfo {
	firstName: string
	middleName: string
	lastName: string
	phoneNumber: string // temporary with + sign???
	salutation: string
	email: string
	password: string
}

export interface IBankDetailsInfo {
	creditCardNumber: number
	creditCardName: string
	expirationDate: Date // temporary month and year????
	bankName: string // payment network?? or type of payment??
	bankAccountType: string
	accountName: string
	accountNumber: number // might change to string
	abaRoutingNumber: number // might change to string
}

export interface IQuestionnareInfo {}
