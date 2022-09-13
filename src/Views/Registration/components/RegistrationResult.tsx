import { faDownload, faEye, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonVariety } from 'components'
import { useState } from 'react'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { BASE_URL } from 'shared/config'
import { DownloadContractModal } from './Modal/DownloadContractModal'

interface RegistrationResultProps {
	email: string | undefined
	success?: boolean
}

export const RegistrationResult = ({
	email,
	success,
}: RegistrationResultProps) => {
	const [showDownloadContractModal, setShowDownloadContractModal] =
		useState<boolean>(false)
	return (
		<Container fluid className="v-middle">
			<Row className="justify-content-center align-items-center vh-100">
				<Col lg={6} className="text-center">
					{success ? (
						<>
							<h3 className="text-center mb-4">
								Registration Succesful!
							</h3>
							<p>
								We have sent the next steps in our confirmation
								email{' '}
								<strong className="text-secondary">
									{email}
								</strong>
								.
							</p>
							<p className="mt-5">
								<a
									className="rounded-pill btn btn-outline-secondary"
									href={`${BASE_URL}/static/pdf/MakoRx_Pharmacy_Agreement_CommericalRetail_CommercialSpecialty_LoyaltyCard_Tablet_PointOfCareTesting.pdf`}
									target="_blank"
								>
									<FontAwesomeIcon
										icon={faEye}
										className="me-2"
									/>
									Preview of Contract
								</a>
							</p>
						</>
					) : (
						<>
							<h3 className="text-center mb-4 text-danger">
								Something went wrong
							</h3>
							<p>
								We apologize for the inconvenience. Please try
								again.
							</p>
							<Link className="link-secondary h6 text-decoration-none" to={'/'}>
								<FontAwesomeIcon
									icon={faHome}
									className="me-2"
								/>
								Back to Home
							</Link>
						</>
					)}
				</Col>
			</Row>
		</Container>
	)
}
