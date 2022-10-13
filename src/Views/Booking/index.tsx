import axios from 'axios'
import { convertFieldsToSnakeCase } from 'common/Util'
import { SideNav } from 'components'
import { createContext, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { API_URL, TOKEN } from 'shared/config'
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
	serviceDetail: any
	setServiceDetail: any
	partnerDetail: any
	setPartnerDetail: any
	handleSubmitAll: any
	bookingId: any
	setBookingId: any
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
	serviceDetail: null,
	setServiceDetail: () => {},
	partnerDetail: null,
	setPartnerDetail: () => {},
	handleSubmitAll: () => {},
	bookingId: null,
	setBookingId: () => {},
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

	const [bookingDate, setBookingDate] = useState()
	const [bookingTime, setBookingTime] = useState()

	const [bookingId, setBookingId] = useState<string>('')

	const [serviceDetail, setServiceDetail] = useState<any>()

	const [partnerDetail, setPartnerDetail] = useState<any>()

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${accessToken}`,
	}

	console.log(serviceDetail, 'detail')

	const handleSubmitAll = (patientInfo: IPatient) => {
		// if (appointmentInfo && partnerInfo && patientInfo) {
		const patientDetails = {
			firstName: patientInfo?.firstName,
			middleName: patientInfo?.middleName || null,
			lastName: patientInfo?.lastName,
			gender: patientInfo?.gender,
			birthdate: patientInfo?.birthdate,
			guardianFirstName: patientInfo?.guardiansFirstName || null,
			guardianLastName: patientInfo?.guardiansLastName || null,
			email: patientInfo?.email,
			phoneNumber: patientInfo?.phoneNumber,
			couponCode: patientInfo?.couponCode || null,
			howDidYouHearAboutThisService:
				patientInfo?.howDidYouHearAboutThisService,
		}

		const appointmentDetails = {
			partner: partnerInfo?.partner,
			service: appointmentInfo?.service,
			practitioner: null,
			scheduledTime: bookingTime || '09:30:00',
			scheduledDate: bookingDate,
			notes: 'test',
		}

		const params = {
			patient: convertFieldsToSnakeCase(patientDetails),
			appointments: [convertFieldsToSnakeCase(appointmentDetails)],
		}

		const formData = new FormData()

		formData.append('data', JSON.stringify(params))
		formData.append('patient_photo', patientInfo.patientPhoto[0])

		console.log(formData, 'all params')

		const headers = {
			'Content-Type': 'multipart/data',
			Authorization: `Token ${TOKEN}`,
		}

		axios
			.post(`${API_URL}/booking/`, formData, {
				headers,
			})
			.then((response) => {
				if (response.data.data) {
					console.log(response.data.data.id)
					setBookingId(response.data.data.id)
				}
			})
			.catch((err) => {
				console.log(err, 'error')
			})
		// }
	}

	return (
		<>
			{/* <button
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
			</button> */}
			<SideNav
				className={
					!location.pathname.includes('details')
						? 'bg-primary fixed-left'
						: 'fixed-top bg-white'
				}
				careConnectLogo
			/>
			<BookingContext.Provider
				value={{
					appointmentInfo,
					setAppointmentInfo,
					partnerInfo,
					setPartnerInfo,
					headers,
					bookingDate,
					setBookingDate,
					bookingTime,
					setBookingTime,
					serviceDetail,
					setServiceDetail,
					partnerDetail,
					setPartnerDetail,
					handleSubmitAll,
					bookingId,
					setBookingId,
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
