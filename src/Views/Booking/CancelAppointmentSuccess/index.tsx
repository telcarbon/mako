import setBodyClass from 'common/Util'
import { Button } from 'components'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const CancelAppointmentSuccess = () => {
    const navigate = useNavigate()
	setBodyClass(['full-width'])
    
	return (
		<Container fluid className="v-middle">
			<Row className="justify-content-center align-items-center vh-100">
				<Col lg={6} className="text-center">
					<h3 className="text-center mb-4">
						Your appointment has been cancelled
					</h3>
					<p>Thanks for letting us know.</p>
					<Button className="mt-5" onClick={() => navigate('..')}>
						Back to Booking
					</Button>
				</Col>
			</Row>
		</Container>
	)
}
