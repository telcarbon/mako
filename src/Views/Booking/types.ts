export interface IAppointment {
	city: string
	state: string
	appointment: number
}

export interface IBranch {
	branch: number
}

export interface IConfirmAppointment {
	firstName: string
	lastName: string
	middleName: string
	services: string
	gender: string
	dob: string
	email: string
	phoneNumber: string
	photo: any
	terms: boolean
}

export const AppointmentOptions = [
	{
		value: 1,
		name: 'Flu Test',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		value: 2,
		name: 'Strep Test',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
	},
	{
		value: 3,
		name: 'HIV Test',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet..',
	},
	{
		value: 4,
		name: 'Urinalysis for UTI',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet..',
	},
	{
		value: 5,
		name: 'A1C Test',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet..',
	},
	{
		value: 7,
		name: 'Annual Physical Medical Visit',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet..',
	},
	{
		value: 8,
		name: 'Blood Test',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet..',
	},
]

export const ClinicOptions = [
	{
		value: 1,
		name: 'Clinic A',
		address: '3429, Beacon St., NC',
	},
	{
		value: 2,
		name: 'Clinic B',
		address: '3429, Beacon St., NC',
	},
	{
		value: 3,
		name: 'Clinic C',
		address: '3429, Beacon St., NC',
	},
]

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
