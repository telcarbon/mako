import { faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import classNames from 'classnames'
import setBodyClass, { getStartAndEndTime } from 'common/Util'
import { ContentHeader, SubmitButton } from 'components'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from 'shared/config'
import { BookingContext } from '..'
import { AppointmentDetailsCard } from '../components/AppointmentDetailsCard'
import { BookingDetail } from '../types'

export const BookingDetails = () => {
	const navigate = useNavigate()

	const {
		headers,
		bookingId,
		bookingTime,
		serviceDetail,
		bookingDate,
		partnerDetail,
		setAppointmentInfo,
		setPartnerInfo,
		setBookingDate,
		setBookingTime,
		setServiceDetail,
		setPartnerDetail,
		setBookingId,
		isSuccess,
		bookingInfo,
		setBookingInfo,
		formPayload,
	} = useContext(BookingContext)

	const [bookingDetail, setBookingDetail] = useState<BookingDetail>()

	setBodyClass(['full-width'])

	const getAppointmentDetails = () => {
		axios
			.get(
				`${API_URL}/booking/${bookingId}/?expand=patient,appointments`,
				{
					headers,
				}
			)
			.then((response) => {
				if (response.data) {
					setBookingDetail(response.data)
				}
			})
	}

	useEffect(() => {
		if (bookingId) {
			getAppointmentDetails()
		}
	}, [bookingId])

	const backToBooking = () => {
		setAppointmentInfo({})
		setPartnerInfo({})
		setBookingDate({})
		setBookingTime({})
		setServiceDetail({})
		setPartnerDetail({})
		setBookingId({})
		setBookingInfo({})
		navigate('../')
		window.location.reload()
	}

	return (
		<Container
			fluid
			className={classNames({
				'v-middle': !isSuccess,
				'pt-5 mt-3': isSuccess,
			})}
		>
			{isSuccess ? (
				<>
					<ContentHeader title="Here are your booking details" />
					<Row className="my-4 justify-content-center ">
						<Col lg={7}>
							<p className="pb-4 text-center">
								Please check your e-mail for your booking
								confirmation and appointment QR code.
							</p>
							{formPayload &&
								formPayload.map((payload: any, i: number) => (
									<AppointmentDetailsCard
										key={i}
										service={payload.serviceName}
										price={payload.servicePrice}
										reference={`Reference No. ${bookingDetail?.appointments[0]?.reference_number}`}
										partner={payload.partnerName}
										location={payload.partnerLocation}
										time={getStartAndEndTime(
											payload.scheduledTime,
											payload.serviceDuration
										)}
										patientName={`${payload.patient.firstName} ${payload.patient.lastName}`}
										date={moment(
											payload.scheduledDate
										).format('dddd, MMMM DD, YYYY')}
										isConfirmed
									/>
								))}
							<p className="py-4 text-center">
								Payment for the services booked will be settled
								at the pharmacy / clinic.
								<br /> Forms of payment available will depend on
								the pharmacy / clinic.
							</p>
							<div className="text-center">
								<p>
									<strong>
										{partnerDetail?.name} Contact Details
									</strong>
									<br />
									{partnerDetail?.phone_number}
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
		</Container>
	)
}
