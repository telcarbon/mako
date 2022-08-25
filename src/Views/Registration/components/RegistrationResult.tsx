import { faDownload } from '@fortawesome/free-solid-svg-icons'
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
								<Button
									variant="outline-secondary"
									className="rounded-pill mt-5"
									onClick={() =>
										setShowDownloadContractModal(true)
									}
								>
									<FontAwesomeIcon
										icon={faDownload}
										className="me-2"
									/>
									Download Contract
								</Button>
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
			<DownloadContractModal
				show={showDownloadContractModal}
				setShow={() => setShowDownloadContractModal(false)}
			/>
		</Container>
	)
}
