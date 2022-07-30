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
		id: 3,
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
	name: string
	type: number
	street: string
	unitFloorBuilding: string
	email: string
	phoneNumber: string
	city: string
	state: string
	zipCode: string
	country: string
	npi: string
	ncpdp: string
}

export interface IBusinessRepInfo {
	firstName: string
	middleName: string
	lastName: string
	phoneNumber: string
	salutation: string
	email: string
	password: string
}

export interface IBankDetailsInfo {
	// creditCardNumber: string
	// creditCardName: string
	// expirationDate: string
	bankName: string // payment network
	bankAccountType: string
	accountName: string
	accountNumber: string
	abaRoutingNumber: string
}

export interface IQuestionnareInfo {
	plebotomy: boolean | null
	licensed: boolean | null | undefined
	phlebotomist: [
		{
			phlebotomistName: string
		}
	]
	trainExistingStaff: boolean | null
	offerClia: boolean | null
	isCliaWaivedSite: boolean | null
	hasParkingLot: boolean | null
	offerPrescription: boolean | null
	cliaCertification: any
}

export interface ITermsInfo {
	general: boolean | null
	techUsage: boolean | null
	bankAccountUsage: boolean | null
}

export const Questions = {
	plebotomy: 'Would you like to offer phlebotomy/blood draw services?',
	licensed: 'Do you have a licensed phlebotomist?',
	trainExistingStaff:
		'Would you like to train your existing staff in phlebotomy?',
	offerClia:
		'Would you like to offer CLIA waived point of care testing services to the general public (Strep, HIV, UTI, Flu, A1c, Blood Pressure, etc)?',
	isCliaWaivedSite: 'Is your business a CLIA WAIVED site?',
	hasParkingLot:
		'Does your business have parking lot area for MakoRx mobile medical unit to complete annual physical exams for patients?',
	offerPrescription:
		'Does your business offer prescription delivery via company driver or courier service?',
}
