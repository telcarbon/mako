import { ContentHeader, SubmitButton } from 'components'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { AppointmentDetailsCard } from '../components/AppointmentDetailsCard'

export const BookingDetails = () => {
    const navigate = useNavigate()
	return (
		<Container fluid>
			<ContentHeader
				title="Here are your booking details"
				backText="Back"
				backLink={-1}
			/>
			<Row className="my-4 justify-content-center ">
				<Col lg={7}>
					<p className="pb-4 text-center">
						You will receive an e-mail at{' '}
						<strong className="text-secondary">
							luke.fisher@gmail.com
						</strong>{' '}
						regarding <br />
						your appointment.
					</p>
					<AppointmentDetailsCard
						service={'Flu Test'}
						price={'0.00'}
						reference={'Reference No. 123 456 789'}
						location={'Clinic A'}
						time={'9:30 AM - 10:00 AM '}
						date={'Wednesday, June 23, 2022'}
						isConfirmed
					/>
					<p className="py-4 text-center">
						Please contact the pharmacy/clinic if you don’t receive
						a confirmation email
						<br /> within the next 30 minutes.
					</p>
					<div className="text-center">
						<p>
							<strong>Clinic A Contact Details</strong>
							<br />
							+1 987 6543
							<br />
							clinica@gmail.com
						</p>
					</div>
				</Col>
			</Row>
			<div className="my-4 mx-auto text-center">
				<SubmitButton
					pending={false}
					pendingText="Saving"
					className="col-lg-auto"
                    onClick={() => navigate('/booking')}
				>
					Back to Booking
				</SubmitButton>
			</div>
		</Container>
	)
}
