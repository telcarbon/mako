import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const VerifyEmail = () => {
	return (
		<>
			<Container fluid className="v-middle">
				<Row className="justify-content-center align-items-center vh-100">
					<Col lg={6}>
						<h3 className="mb-5 text-center">
							Password reset steps sent
						</h3>
						<p className="text-center mb-5">
							We’ve sent an e-mail{' '}
							<strong className="text-secondary">
								johnmorrison@gmail.com
							</strong>{' '}
							to help you recover your account. Password resets
							are valid for only 24 hours.
						</p>

						<div className="text-center">
							<Link
								to={'/user'}
								className="btn btn-primary rounded-pill"
							>
								Sign in to your Account
							</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	)
}
