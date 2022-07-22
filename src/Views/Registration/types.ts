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
	creditCardNumber: string
	creditCardName: string
	expirationDate: string
	bankName: string // payment network
	bankAccountType: string
	accountName: string
	accountNumber: string
	abaRoutingNumber: string
}

export interface IQuestionnareInfo {}
