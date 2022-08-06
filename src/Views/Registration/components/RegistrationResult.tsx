import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { IBusinessInfo } from '../types'

interface RegistrationResultProps {
	email: string
	success?: boolean
}

export const RegistrationResult = ({
	email,
	success,
}: RegistrationResultProps) => {
	return (
		<Container fluid className="register-success">
			<Row className="justify-content-center align-items-center vh-100">
				<Col lg={6} className="text-center">
					{success ? (
						<>
							<h5 className="text-center mb-4">
								Registration Succesful!
							</h5>
							<p>
								We’ve also sent a copy of the contract as well
								as next steps to your e-mail{' '}
								<strong className="text-secondary">
									{email}
								</strong>
								.
							</p>
						</>
					) : (
						<>
							<h5 className="text-center mb-4 text-danger">
								Something went wrong
							</h5>
							<p>
								We apologize for the inconvenience. Please try
								again.
							</p>
						</>
					)}
				</Col>
			</Row>
		</Container>
	)
}
