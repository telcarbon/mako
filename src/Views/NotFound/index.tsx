import setBodyClass from 'common/Util'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const NotFound = () => {
	setBodyClass(['full-width'])
	return (
		<Container fluid className="v-middle">
			<Row className="justify-content-center align-items-center vh-100">
				<Col lg={12}>
					<div className="text-center">
						<h1 className="display-1 fw-bold text-secondary">
							404
						</h1>
						<p className="fs-3">
							<span className="text-danger">Opps!</span> Page not
							found.
						</p>
						<p className="lead">
							The page you're looking for doesn't exist.
						</p>
						{/* <Link to={'../../'} className="btn btn-primary">
							Go Home
						</Link> */}
					</div>
				</Col>
			</Row>
		</Container>
	)
}
