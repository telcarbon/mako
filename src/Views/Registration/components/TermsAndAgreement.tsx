import { Button, ContentHeader } from 'components'
import { Container, Row, Col, ProgressBar } from 'react-bootstrap'
import { useMatch, useNavigate } from 'react-router-dom'

export const TermsAndAgreement = () => {
	const match = useMatch('registration/*')
	const navigate = useNavigate()
	
	return (
		<Container fluid>
			<ContentHeader
				title="Terms & Agreement"
				backText="Back"
				backLink={-1}
			/>
			<Row className="justify-content-center mb-5">
				<Col lg={10}>
					
				</Col>
			</Row>
			<div className="footer w-75">
				<ProgressBar
					variant="secondary"
					now={100}
					className="col-lg-7 pull-left mt-3"
				/>
				<Button
					type="submit"
					// disabled={!isDirty}
					className="col-lg-auto pull-right"
					onClick={() => navigate(`${match?.pathnameBase}/success`)}
				>
					Agree & Proceed
				</Button>
			</div>
		</Container>
	)
}
