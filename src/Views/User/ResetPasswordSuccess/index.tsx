import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const ResetPasswordSuccess = () => {
	return (
		<>
			<Container fluid className="v-middle">
				<Row className="justify-content-center align-items-center vh-100">
					<Col lg={6}>
						<h3 className="mb-5 text-center">
							Password Successfully Reset
						</h3>
						<p className="text-center mb-5">
							You’ve reset your account’s password.
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
