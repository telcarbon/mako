export interface IAppointment {
	city: string
	state: string
	service: number
	multiServices?: []
}

export interface IPartner {
	partner: number
}

export interface IPatient {
	firstName: string
	lastName: string
	middleName: string
	services: string
	gender: string
	birthdate: string
	email: string
	phoneNumber: string
	guardiansFirstName: string
	guardiansLastName: string
	patientPhoto: any
	terms: boolean
	couponCode: string
	howDidYouHearAboutThisService: string
	others: string
}
export interface IServicesPricing {
	id: number
	price: string
	name: string
	duration: number
	description: string
}

export interface TypeOfLocation {
	id: number
	name: string
}

export interface IPartners {
	id: number
	name: string
	unit_floor_building: string
	street: string
	state: string
	city: string
	zip_code: string
	partner_configuration: any[]
	type: TypeOfLocation
}

export interface IAvailableTime {
	service: number
	partner: number
	date: string[]
}

export interface BookingDetail {
	appointments: [
		{
			reference_number: string
		}
	]

	patient: {
		email: string
	}
}

export enum AppointmentStatus {
	PENDING = 1,
	CANCEL = 2,
	CONFIRMED = 3,
	REJECTED = 4,
	COMPLETED = 5,
}

export interface IAppointmentDetails {
	status: number
	scheduled_time: string
	scheduled_date: string
}

export const ServicesRadioOptions = [
	{
		value: 1,
		label: 'Family/friend',
	},
	{
		value: 2,
		label: 'Pharmacy',
	},
	{
		value: 3,
		label: 'Employer',
	},
	{
		value: 4,
		label: 'Social media',
	},
	{
		value: 5,
		label: 'MakoRx website',
	},
	{
		value: 6,
		label: 'Other',
	},
]

export const genderOptions = [
	{
		label: 'Male',
		value: 'Male',
	},
	{
		label: 'Female',
		value: 'Female',
	},
]

export const cancelOptions = [
	{
		label: 'Conflict in schedule',
		value: 'Conflict in schedule',
	},
	{
		label: 'I found another provider or doctor',
		value: 'I found another provider or doctor',
	},
	{
		label: 'Other',
		value: 'Other',
	},
]
