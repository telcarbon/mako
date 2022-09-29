import { convertFieldsToSnakeCase } from 'common/Util'
import { SideNav } from 'components'
import { createContext, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Appointment } from './Appointment'
import { ConfirmAppointment } from './Confirm'
import { BookingDetails } from './Details'
import { SelectBranch } from './SelectBranch'
import { SelectTime } from './SelectTime'
import { IAppointment, IPartner, IPatient } from './types'

interface BookingContextProps {
	headers: any
	appointmentInfo: any
	setAppointmentInfo: any
	partnerInfo: any
	setPartnerInfo: any
	bookingDate: any
	setBookingDate: any
	bookingTime: any
	setBookingTime: any
	patientInfo: any
	setPatientInfo: any
	serviceDetail: any
	setServiceDetail: any
	handleSubmitAll: any
}

export const BookingContext = createContext<BookingContextProps>({
	headers: null,
	appointmentInfo: null,
	setAppointmentInfo: () => {},
	partnerInfo: null,
	setPartnerInfo: () => {},
	bookingDate: null,
	setBookingDate: () => {},
	bookingTime: null,
	setBookingTime: () => {},
	patientInfo: null,
	setPatientInfo: () => {},
	serviceDetail: null,
	setServiceDetail: () => {},
	handleSubmitAll: () => {},
})

export const Booking = () => {
	const navigate = useNavigate()
	const accessToken = localStorage.getItem('accessToken')

	// if (accessToken === '') {
	// 	console.log('sample')
	// 	return <NotFound />
	// 	navigate('/error-404')
	// }

	const [appointmentInfo, setAppointmentInfo] = useState<IAppointment>({
		state: 'North Carolina',
		city: '',
		service: 0,
	})

	const [partnerInfo, setPartnerInfo] = useState<IPartner>({
		partner: 0,
	})

	const [patientInfo, setPatientInfo] = useState<IPatient>({
		firstName: '',
		lastName: '',
		services: '',
		middleName: '',
		gender: '',
		birthdate: '',
		email: '',
		phoneNumber: '',
		guardiansFirstName: '',
		guardiansLastName: '',
		patientPhoto: '',
		terms: false,
		couponCode: '',
	})

	const [bookingDate, setBookingDate] = useState()
	const [bookingTime, setBookingTime] = useState()

	const [serviceDetail, setServiceDetail] = useState<any>()

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${accessToken}`,
	}

	console.log(serviceDetail, 'detail')

	const handleSubmitAll = (patientx: any) => {
		// if (appointmentInfo && partnerInfo && patientInfo) {
			const patientDetails = {
				firstName: patientx?.firstName,
				middleName: patientx?.middleName || null,
				lastName: patientx?.lastName,
				gender: patientx?.gender,
				birthdate: patientx?.birthdate,
				guardianFirstName: patientx?.guardiansFirstName || null,
				guardianLastName: patientx?.guardiansLastName || null,
				email: patientx?.email,
				phoneNumber: patientx?.phoneNumber,
				couponCode: patientx?.couponCode || null,
			}

			const appointmentDetails = [
				{
					partner: partnerInfo?.partner,
					service: appointmentInfo?.service,
					practitioner: null,
					scheduled_time: bookingTime,
					scheduled_date: bookingDate,
					notes: 'test',
				},
			]

			const params = {
				patient: convertFieldsToSnakeCase(patientDetails),
				appointments: convertFieldsToSnakeCase(appointmentDetails),
			}

			console.log(params, 'all params')
		// }
	}

	return (
		<>
			<button
				onClick={() => {
					console.log(
						appointmentInfo,
						partnerInfo,
						patientInfo,
						bookingDate,
						bookingTime
					)
				}}
			>
				test
			</button>
			<SideNav className="fixed-left bg-primary" />
			<BookingContext.Provider
				value={{
					appointmentInfo,
					setAppointmentInfo,
					partnerInfo,
					setPartnerInfo,
					headers,
					bookingDate,
					setBookingDate,
					patientInfo,
					setPatientInfo,
					bookingTime,
					setBookingTime,
					serviceDetail,
					setServiceDetail,
					handleSubmitAll,
				}}
			>
				<Routes>
					<Route path="/" element={<Appointment />} />
					<Route path="/select-branch" element={<SelectBranch />} />
					<Route path="/select-time" element={<SelectTime />} />
					<Route
						path="/confirm-appointment"
						element={<ConfirmAppointment />}
					/>
					<Route path="/details" element={<BookingDetails />} />
				</Routes>
			</BookingContext.Provider>
		</>
	)
}
