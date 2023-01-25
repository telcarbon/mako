import { ContentHeader } from 'components'
import { Container, Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

export const Payment = () => {
	const handleSubmit = async () => {}

	return (
		<Container fluid>
			<ContentHeader title="Payment" backText="Back" backLink={-1} />
			<Row className="justify-content-center">
				<Col lg={10}></Col>
			</Row>
		</Container>
	)
}
