import axios from 'axios'
import { convertFieldsToSnakeCase, findDataById } from 'common/Util'
import { SideNav } from 'components'
import _ from 'lodash'
import moment from 'moment'
import { createContext, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { API_URL, TOKEN } from 'shared/config'
import { Appointment } from './Appointment'
import { CancelAppointment } from './CancelAppointment'
import { CancelAppointmentSuccess } from './CancelAppointmentSuccess'
import { ConfirmAppointment } from './Confirm'
import { BookingDetails } from './Details'
import { PatientInfo } from './PatientInfo'
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
	serviceCounters: any
	setServiceCounters: any
	bookingInfo: any
	setBookingInfo: any
	patientDetail: any
	setPatientDetail: any
	oldServiceCounters: any
	setOldServiceCounters: any
	formPayload: any
	isConfirmPageLoading: boolean
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
	serviceCounters: null,
	setServiceCounters: () => {},
	bookingInfo: null,
	setBookingInfo: () => {},
	patientDetail: null,
	setPatientDetail: () => {},
	oldServiceCounters: null,
	setOldServiceCounters: () => {},
	formPayload: null,
	isConfirmPageLoading: false,
})

export const Booking = () => {
	const navigate = useNavigate()
	const accessToken = localStorage.getItem('accessToken')
	// if (accessToken === '') {
	// 	console.log('sample')
	// 	return <NotFound />
	// 	navigate('/error-404')
	// }
	const [serviceCounters, setServiceCounters] = useState<any[]>([])
	const [oldServiceCounters, setOldServiceCounters] = useState<any[]>([])
	const [appointmentInfo, setAppointmentInfo] = useState<IAppointment>({
		state: 'North Carolina',
		city: '',
		multiServices: [],
	})
	const [partnerInfo, setPartnerInfo] = useState<IPartner>({
		partner: 0,
	})
	const [bookingDate, setBookingDate] = useState()
	const [isConfirmPageLoading, setIsConfirmPageLoading] =
		useState<boolean>(false)
	const [bookingTime, setBookingTime] = useState()
	const [bookingInfo, setBookingInfo] = useState<any[]>()
	const [bookingId, setBookingId] = useState<string>('')
	const [serviceDetail, setServiceDetail] = useState<any>()
	const [partnerDetail, setPartnerDetail] = useState<any>()
	const [formPayload, setFormPayload] = useState<any>()
	const [patientDetail, setPatientDetail] = useState<IPatient>({
		personalInfo: [
			{
				firstName: '',
				lastName: '',
				middleName: '',
				gender: '',
				birthdate: '',
				email: '',
				phoneNumber: '',
				guardianFirstName: '',
				guardianLastName: '',
				photo: '',
				photoFile: '',
			},
		],
		howDidYouHearAboutThisService: '',
		others: '',
	})

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Token ${TOKEN}`,
	}

	const handleSubmitAll = async (formValues: any) => {
		let payload: any[] = []
		let detailPayload: any[] = []
		let totalAmount = 0
		let description: any[] = []
		let productName: any[] = []
		setIsConfirmPageLoading(true)

		Object.keys(formValues).forEach((key) => {
			if (key.match(/appointment/g) && formValues[key] !== undefined) {
				// debugger
				const servCounterId = key.split('_')[1]
				const booking = findDataById(
					parseFloat(servCounterId),
					bookingInfo
				)

				totalAmount += parseFloat(booking.price)
				description.push(booking.description)
				productName.push(booking.name)

				// const patient = findDataById(formValues[key], patientDetail.patient)
				const patient = patientDetail.personalInfo[formValues[key] - 1]

				const appointment = {
					partner: partnerDetail.id,
					service: booking.serviceId,
					practitioner: null,
					scheduledTime: booking.bookingTime,
					scheduledDate: booking.bookingDate,
					notes: 'test',
				}

				const newPatient = {
					...convertFieldsToSnakeCase(patient),
					birthdate: moment(patient.birthdate).format('YYYY-MM-DD'),
					how_did_you_hear_about_this_service:
						patientDetail?.howDidYouHearAboutThisService.includes(
							'Other'
						)
							? patientDetail.others
							: patientDetail.howDidYouHearAboutThisService,
					coupon_code: '',
				}
				const { photo_file: _, ...newPatientObject } = newPatient

				const params = {
					patient: newPatientObject,
					...convertFieldsToSnakeCase(appointment),
				}

				const storePayload = {
					patient,
					...appointment,
					serviceName: booking.name,
					servicePrice: booking.price,
					serviceDuration: booking.duration,
					partnerLocation: `${partnerDetail.street}${
						partnerDetail.unit_floor_building === null
							? ''
							: ` ${partnerDetail.unit_floor_building}`
					}, ${partnerDetail.city}, NC, ${partnerDetail.zip_code}`,
					partnerName: partnerDetail.name,
				}

				detailPayload.push(storePayload)
				payload.push(params)
			}
		})

		setFormPayload(detailPayload)

		const formData = new FormData()

		formData.append('data', JSON.stringify({ appointments: [...payload] }))

		formData.append(
			'details',
			JSON.stringify({
				amount: totalAmount.toFixed(2),
				product_name: productName.map((m) => m).join(', '),
				description:
					description.map((m) => m).join(', ') ||
					productName.map((m) => m).join(', '),
			})
		)

		const headers = {
			'Content-Type': 'multipart/data',
			Authorization: `Token ${TOKEN}`,
		}

		axios
			// .post(`https://makorxbackend.cmdev.cloud/api/checkout/`, formData, {
			// 	headers,
			// })
			.post(`${API_URL}/checkout/`, formData, {
				headers,
			})
			.then((response) => {
				if (response && response.data.checkout_url) {
					localStorage.setItem(
						'checkoutSessionId',
						response.data.checkout_session_id
					)
					setTimeout(() => {
						setIsConfirmPageLoading(false)
						window.location.href = response.data.checkout_url
					}, 500)
				} else {
					localStorage.removeItem('checkoutSessionId')
				}
			})
			.catch((err) => {
				localStorage.removeItem('checkoutSessionId')
				setIsConfirmPageLoading(false)
				navigate('details/error')
			})
	}

	return (
		<>
			<SideNav
				className={
					!location.pathname.includes('details') &&
					!location.pathname.includes('cancel-appointment')
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
					serviceCounters,
					setServiceCounters,
					bookingInfo,
					setBookingInfo,
					patientDetail,
					setPatientDetail,
					oldServiceCounters,
					setOldServiceCounters,
					formPayload,
					isConfirmPageLoading,
				}}
			>
				<Routes>
					<Route index element={<Appointment />} />
					<Route path="select-branch" element={<SelectBranch />} />
					<Route path="select-time" element={<SelectTime />} />
					<Route path="patient-info" element={<PatientInfo />} />
					<Route
						path="confirm-appointment"
						element={<ConfirmAppointment />}
					/>
					<Route
						path={'details/success'}
						element={<BookingDetails />}
					/>
					<Route
						path={'details/error'}
						element={<BookingDetails />}
					/>
					<Route
						path="cancel-appointment/:id"
						element={<CancelAppointment />}
					/>
					<Route
						path="cancel-appointment-success"
						element={<CancelAppointmentSuccess />}
					/>
					{/* <Route
						path="*"
						element={<Navigate to="/page-not-found" replace />}
					/> */}
				</Routes>
			</BookingContext.Provider>
		</>
	)
}
