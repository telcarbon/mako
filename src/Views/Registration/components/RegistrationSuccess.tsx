import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { IBusinessInfo } from '../types'

interface RegistrationSuccessProps {
	email: string
}

export const RegistrationSuccess = ({ email }: RegistrationSuccessProps) => {
	return (
		<Container fluid className="register-success">
			<Row className="justify-content-center align-items-center vh-100">
				<Col lg={6} className="text-center">
					<h5 className="text-center mb-4">
						Registration Succesful!
					</h5>
					<p>
						We’ve also sent a copy of the contract as well as next
						steps to your e-mail{' '}
						<strong className="text-secondary">{email}</strong>.
					</p>
					{/* <Button
						className="rounded-pill mt-5"
						variant="outline-secondary"
					>
						<FontAwesomeIcon icon={faDownload} className="me-2" />
						Download Contract
					</Button> */}
				</Col>
			</Row>
		</Container>
	)
}
