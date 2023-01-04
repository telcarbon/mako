export const mockData = [
	{
		id: 1,
		weekday: 'Monday',
		date: 1,
		isCurrentDay: true,
	},
	{
		id: 2,
		weekday: 'Tuesday',
		date: 2,
	},
	{
		id: 3,
		weekday: 'Wednesday',
		date: 3,
	},
	{
		id: 4,
		weekday: 'Thursday',
		date: 4,
	},
	{
		id: 5,
		weekday: 'Friday',
		date: 5,
	},
	{
		id: 6,
		weekday: 'Saturday',
		date: 6,
	},
	{
		id: 7,
		weekday: 'Sunday',
		date: 7,
	},
	{
		id: 8,
		weekday: 'Monday',
		date: 8,
	},
]

export const slotMockdata = {
	service: 6,
	partner: 4,
	'2023-01-03': [
		{
			time: '09:00:00',
			availableSlots: 2,
		},
		{
			time: '22:57:00',
			availableSlots: 2,
		},
		{
			time: '23:00:00',
			availableSlots: 2,
		},
		{
			time: '23:05:00',
			availableSlots: 2,
		},
	],
}

export const AppointmentOptions = [
	{
		id: 1,
		value: 1,
		name: 'Flu Testsasasa',
		price: '39.99',
		duration: 4,
	},
	{
		id: 2,
		value: 2,
		name: 'Strep Test',
		price: '39.99',
		duration: 4,
	},
	{
		id: 3,
		value: 3,
		name: 'HIV Test',
		price: '39.99',
		duration: 4,
	},
	{
		id: 4,
		value: 4,
		name: 'Urinalysis for UTI',
		price: '39.99',
		duration: 4,
	},
	{
		id: 5,
		value: 5,
		name: 'A1C Test',
		price: '39.99',
		duration: 4,
	},
	{
		id: 7,
		value: 7,
		name: 'Annual Physical Medical Visit',
		price: '39.99',
		duration: 4,
	},
	{
		id: 8,
		value: 8,
		name: 'Blood Test',
		price: '39.99',
		duration: 4,
	},
]

export const mockPartner = [
	{
		id: 5,
		name: 'Mako RX',
		unit_floor_building: '4',
		street: '143',
		state: 'North Carolina',
		city: 'Alamance',
		zip_code: '12345',
		type: {
			id: 2,
			name: 'Clinic',
		},
		partner_configuration: [
			{
				id: 3,
				partner: 5,
				created: '2022-09-29T08:05:35.133341-05:00',
				modified: '2022-12-05T11:32:43.040527-05:00',
				configuration: [
					{
						id: 1,
						created: '2022-10-04T07:40:28.250087-05:00',
						modified: '2022-10-04T07:40:28.250087-05:00',
						opening_time: '10:00:00',
						closing_time: '16:00:00',
						configuration: 3,
						days: {
							id: 2,
							day: 'Monday',
							is_active: true,
						},
					},
					{
						id: 4,
						created: '2022-10-04T07:40:49.796562-05:00',
						modified: '2022-10-04T07:40:49.796562-05:00',
						opening_time: '10:00:00',
						closing_time: '16:00:00',
						configuration: 3,
						days: {
							id: 5,
							day: 'Thursday',
							is_active: true,
						},
					},
					{
						id: 5,
						created: '2022-10-04T07:40:49.797825-05:00',
						modified: '2022-10-04T07:40:49.797825-05:00',
						opening_time: '10:00:00',
						closing_time: '16:00:00',
						configuration: 3,
						days: {
							id: 6,
							day: 'Friday',
							is_active: true,
						},
					},
					{
						id: 33,
						created: '2022-12-05T10:28:29.076099-05:00',
						modified: '2022-12-05T10:28:29.076099-05:00',
						opening_time: '10:00:00',
						closing_time: '16:00:00',
						configuration: 3,
						days: {
							id: 4,
							day: 'Wednesday',
							is_active: true,
						},
					},
				],
				configuration_block_dates: [
					{
						id: 1,
						created: '2022-10-04T08:33:35.533242-05:00',
						modified: '2022-12-05T11:32:43.061023-05:00',
						block_date: '2022-12-10',
						opening_time: '10:00:00',
						closing_time: '16:00:00',
						configuration: 3,
					},
					{
						id: 2,
						created: '2022-10-05T10:01:08.876090-05:00',
						modified: '2022-12-05T11:32:43.064968-05:00',
						block_date: '2022-12-16',
						opening_time: '10:00:00',
						closing_time: '16:00:00',
						configuration: 3,
					},
				],
			},
		],
	},
	{
		id: 6,
		name: 'Mako RX 2',
		unit_floor_building: 'Test 2',
		street: '3',
		state: 'North Carolina',
		city: 'Alamance',
		zip_code: '12345',
		type: {
			id: 2,
			name: 'Clinic',
		},
		partner_configuration: [
			[
				{
					id: 4,
					partner: 6,
					created: '2022-09-29T09:53:28.618009-05:00',
					modified: '2022-12-05T10:02:34.113717-05:00',
					configuration: [
						{
							id: 7,
							created: '2022-10-06T07:01:03.712945-05:00',
							modified: '2022-10-06T07:01:03.712945-05:00',
							opening_time: '10:00:00',
							closing_time: '16:00:00',
							configuration: 4,
							days: {
								id: 2,
								day: 'Monday',
								is_active: true,
							},
						},
						{
							id: 8,
							created: '2022-10-06T07:01:03.713605-05:00',
							modified: '2022-10-06T07:01:03.713605-05:00',
							opening_time: '10:00:00',
							closing_time: '16:00:00',
							configuration: 4,
							days: {
								id: 3,
								day: 'Tuesday',
								is_active: true,
							},
						},
						{
							id: 9,
							created: '2022-10-06T07:01:03.713992-05:00',
							modified: '2022-10-06T07:01:03.713992-05:00',
							opening_time: '10:00:00',
							closing_time: '16:00:00',
							configuration: 4,
							days: {
								id: 4,
								day: 'Wednesday',
								is_active: true,
							},
						},
						{
							id: 10,
							created: '2022-10-06T08:17:05.497151-05:00',
							modified: '2022-10-06T08:17:05.497151-05:00',
							opening_time: '10:00:00',
							closing_time: '16:00:00',
							configuration: 4,
							days: {
								id: 5,
								day: 'Thursday',
								is_active: true,
							},
						},
						{
							id: 12,
							created: '2022-10-06T08:18:21.926816-05:00',
							modified: '2022-10-06T08:18:21.926816-05:00',
							opening_time: '10:00:00',
							closing_time: '16:00:00',
							configuration: 4,
							days: {
								id: 6,
								day: 'Friday',
								is_active: true,
							},
						},
					],
					configuration_block_dates: [
						{
							id: 3,
							created: '2022-10-14T12:29:44.080212-05:00',
							modified: '2022-11-03T10:44:52.098614-05:00',
							block_date: '2022-11-11',
							opening_time: '10:00:00',
							closing_time: '16:00:00',
							configuration: 4,
						},
						{
							id: 5,
							created: '2022-11-03T10:44:52.072078-05:00',
							modified: '2022-11-03T10:44:52.072078-05:00',
							block_date: '2022-11-17',
							opening_time: '10:00:00',
							closing_time: '16:00:00',
							configuration: 4,
						},
						{
							id: 6,
							created: '2022-11-03T10:59:26.689751-05:00',
							modified: '2022-11-03T11:06:05.068058-05:00',
							block_date: '2022-11-07',
							opening_time: '10:00:00',
							closing_time: '16:00:00',
							configuration: 4,
						},
					],
				},
			],
		],
	},
]
