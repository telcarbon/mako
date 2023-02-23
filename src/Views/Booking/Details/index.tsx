import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import classNames from 'classnames'
import setBodyClass, { getStartAndEndTime } from 'common/Util'
import { ContentHeader, LoadingMaskWrap, SubmitButton } from 'components'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {
	Link,
	useNavigate,
	NavigationType,
	useNavigationType,
} from 'react-router-dom'
import { API_URL } from 'shared/config'
import { BookingContext } from '..'
import { AppointmentDetailsCard } from '../components/AppointmentDetailsCard'
import { BookingDetail } from '../types'
import { Action } from 'history'

export const BookingDetails = () => {
	const navigate = useNavigate()
	const navType: NavigationType = useNavigationType()
	const checkoutSessionId = localStorage.getItem('checkoutSessionId')
	// const checkoutSessionId =
	// 	'cs_test_a1WBRSsS7eglCpFVkGPXeK8Hz3q0IBSfhCTNCnDrgp0gtNz5ye7IlFCHRO'
	const hasSessionId = checkoutSessionId !== null

	const {
		headers,
		setAppointmentInfo,
		setPartnerInfo,
		setBookingDate,
		setBookingTime,
		setServiceDetail,
		setPartnerDetail,
		setBookingId,
		setBookingInfo,
	} = useContext(BookingContext)

	const [bookingDetail, setBookingDetail] = useState<BookingDetail[]>()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	setBodyClass(['full-width'])

	useEffect(() => {
		getCheckoutData()
	}, [hasSessionId])

	// useEffect(() => {
	// 	return () => {
	// 		if (navType === Action.Pop) {
	// 			navigate('..')
	// 		}
	// 	}
	// }, [navType])

	const backToBooking = () => {
		setAppointmentInfo({})
		setPartnerInfo({})
		setBookingDate({})
		setBookingTime({})
		setServiceDetail({})
		setPartnerDetail({})
		setBookingId({})
		setBookingInfo({})
		navigate('..')
		localStorage.removeItem('checkoutSessionId')
		window.location.reload()
	}

	const getCheckoutData = async () => {
		setIsLoading(true)
		const payloadId = await axios
			.get(
				// `https://makorxbackend.cmdev.cloud/api/temporary_booking/?checkout_session=${checkoutSessionId}`,
				`${API_URL}/temporary_booking/?checkout_session=${checkoutSessionId}`,
				{ headers }
			)
			.then((response) => {
				if (response && response.data.results) {
					return response.data.results[0].payload.data.id
				}
			})

		const appointments = await axios
			.get(
				`${API_URL}/booking/${payloadId}/?expand=appointments.service,appointments.partner.services,appointments.patient`,
				{ headers }
			)
			.then((response) => {
				setIsLoading(false)
				setBookingDetail(response.data.appointments)
			})

		return appointments
	}

	return (
		<Container
			fluid
			className={classNames({
				'v-middle': !hasSessionId,
				'pt-5 mt-5': hasSessionId,
			})}
		>
			{hasSessionId ? (
				<>
					<ContentHeader title="Here are your booking details" />
					<Row className="my-4 justify-content-center ">
						<Col lg={7}>
							<p className="pb-4 text-center">
								Please check your e-mail for your booking
								confirmation and appointment QR code.
							</p>
							{bookingDetail &&
								bookingDetail.map((item: any, i: number) => {
									const servicePrice =
										item.partner.services.find(
											(data: any) => {
												if (
													data.service ===
													item.service.id
												) {
													return data.price
												}
											}
										)

									return (
										<AppointmentDetailsCard
											key={i}
											service={item.service.name}
											price={servicePrice.price}
											reference={`Reference No. ${item?.reference_number}`}
											partner={item.partner.name}
											location={`${item.partner.street}${
												item.partner
													.unit_floor_building ===
												null
													? ''
													: ` ${item.partner.unit_floor_building}`
											}, ${item.partner.city}, NC, ${
												item.partner.zip_code
											}`}
											time={getStartAndEndTime(
												item.scheduled_time,
												item.service.duration
											)}
											patientName={`${item.patient.first_name} ${item.patient.last_name}`}
											date={moment(
												item.scheduled_date
											).format('dddd, MMMM DD, YYYY')}
											isConfirmed
										/>
									)
								})}
							<p className="py-4 text-center">
								Please contact the pharmacy/clinic if you don't
								receive a confirmation email
								<br /> within the next 30 minutes.
							</p>
							<div className="text-center">
								<p>
									<strong>
										{bookingDetail &&
											bookingDetail[0]?.partner.name}{' '}
										Contact Details
									</strong>
									<br />
									{bookingDetail &&
										bookingDetail[0]?.partner.phone_number}
								</p>
							</div>
						</Col>
					</Row>
					<div className="my-4 mx-auto text-center">
						<SubmitButton
							pending={false}
							pendingText="Saving"
							className="col-lg-auto"
							onClick={backToBooking}
						>
							Back to Booking
						</SubmitButton>
					</div>
				</>
			) : (
				<Row className="justify-content-center align-items-center vh-100 text-center">
					<Col lg={7}>
						<h3 className="mb-4 text-danger">
							Something went wrong
						</h3>
						<p className="pb-3">
							We apologize for the inconvenience. <br />
							Please try again.
						</p>
						<Link
							className="link-secondary h6 text-decoration-none"
							to={'..'}
							onClick={backToBooking}
						>
							<FontAwesomeIcon icon={faHome} className="me-2" />
							Back to Home
						</Link>
					</Col>
				</Row>
			)}
			{isLoading && hasSessionId && <LoadingMaskWrap />}
		</Container>
	)
}
