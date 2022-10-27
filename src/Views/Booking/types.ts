export interface IAppointment {
	city: string
	state: string
	service: number
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
}
export interface IServicesPricing {
	id: number
	price: string
	name: string
	duration: number
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
	partner_configuration: []
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

export const ServicesRadioOptions = [
	{
		value: 1,
		label: 'Referral from family/friend/pharmacy',
	},
	{
		value: 2,
		label: 'Employer',
	},
	{
		value: 3,
		label: 'Social media',
	},
	{
		value: 4,
		label: 'MakoRx website',
	},
	{
		value: 5,
		label: 'Flyer',
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
