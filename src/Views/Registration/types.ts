export interface IOption {
	id?: number
	label: string
	value: number
}

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
