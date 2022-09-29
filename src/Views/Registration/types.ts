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
		label: 'Checking',
		value: 'Checking',
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
	bankName: string | null
	bankAccountType: string | null
	accountName: string | null
	accountNumber: string | null
	abaRoutingNumber: string | null
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
	hasPublicBathroom: boolean | null
	cliaCertification: any
}

export interface ITermsInfo {
	termsOfUse: boolean
	privacyStatement: boolean
}

export enum StripeFields {
	CARD_NUMBER = 'cardNumber',
	CARD_CVC_NUMBER = 'cardCVCNumber',
	CARD_EXPIRY_DATE = 'cardExpiryDate',
}

export const Questions: Record<string, string> = {
	plebotomy: 'Would you like to offer phlebotomy/blood draw services?',
	licensed: 'Do you have a licensed phlebotomist?',
	trainExistingStaff:
		'Would you like to train your existing staff in phlebotomy?',
	offerClia:
		'Would you like to offer CLIA waived point of care testing services to the general public (Strep, HIV, UTI, Flu, A1c, Blood Pressure, etc)?',
	isCliaWaivedSite: 'Is your business a CLIA WAIVED site?',
	hasParkingLot:
		'Does your business have parking lot area for MakoRx mobile medical unit to complete annual physical exams for patients?',
	hasPublicBathroom:
		'Does your business have a public bathroom for patients?',
	offerPrescription:
		'Does your business offer prescription delivery via company driver or courier service?',
}
