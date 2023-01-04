import axios from 'axios'
import setBodyClass, { getStartAndEndTime } from 'common/Util'
import { ContentHeader, SubmitButton } from 'components'
import moment from 'moment'
import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
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
		navigate('../')
		window.location.reload()
	}

	return (
		<Container fluid className="pt-5 mt-3">
			<ContentHeader title="Here are your booking details" />
			<Row className="my-4 justify-content-center ">
				<Col lg={7}>
					<p className="pb-4 text-center">
						You will receive an e-mail at{' '}
						<strong className="text-secondary">
							{bookingDetail?.patient?.email}
						</strong>{' '}
						regarding <br />
						your appointment.
					</p>
					<AppointmentDetailsCard
						service={serviceDetail?.name}
						price={serviceDetail?.price}
						reference={`Reference No. ${bookingDetail?.appointments[0]?.reference_number}`}
						partner={partnerDetail?.name}
						location={`${partnerDetail.street}${
							partnerDetail.unit_floor_building === null
								? ''
								: ` ${partnerDetail.unit_floor_building}`
						}, ${partnerDetail.city}, NC, ${
							partnerDetail.zip_code
						}`}
						time={getStartAndEndTime(
							bookingTime,
							serviceDetail?.duration
						)}
						date={moment(bookingDate).format('dddd, MMMM DD, YYYY')}
						isConfirmed
					/>
					<p className="py-4 text-center">
						Payment for the services booked will be settled at the
						pharmacy / clinic.
						<br /> Forms of payment available will depend on the
						pharmacy / clinic.
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
		</Container>
	)
}
