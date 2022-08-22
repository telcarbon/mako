import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonVariety, Button } from 'components'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from 'shared/config'

interface RegistrationResultProps {
	email: string | undefined
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
							<p>
								<a
									className="rounded-pill btn btn-outline-secondary mt-5"
									href={`${BASE_URL}/static/pdf/MakoRx_Pharmacy_Agreement_CommericalRetail_CommercialSpecialty_LoyaltyCard_Tablet_PointOfCareTesting.docx`}
									download
								>
									<FontAwesomeIcon
										icon={faDownload}
										className="me-2"
									/>
									Download Contract
								</a>
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
							<Link className="link-secondary" to={'/'}>
								Back to Home
							</Link>
						</>
					)}
				</Col>
			</Row>
		</Container>
	)
}
