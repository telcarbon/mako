import { Button } from 'components'
import { Col, Modal, Row } from 'react-bootstrap'

interface RemoveServiceModalProps {
	show: boolean
	setShow: (show: boolean) => void
	onClick?: any
	name: any[]
	setValue?: any
}

export const UnselectedPatientModal = ({
	show,
	setShow,
	onClick,
	name,
	setValue,
}: RemoveServiceModalProps) => {
	return (
		<Modal
			show={show}
			onHide={() => setShow(false)}
			centered
			// size={'lg'}
			backdrop="static"
		>
			<Modal.Body>
				<Row className="d-flex justify-content-center my-4">
					<Col>
						<h5 className="text-center fw-light">
							You have not added{' '}
							<strong className="fw-bold text-capitalize">
								{name
									.map((m: { name: any }) => m?.name)
									.join(', ')}{' '}
							</strong>
							to any of the appointments you are booking.
						</h5>
						<p className="mt-4 pb-3 text-center">
							Do you still want to proceed with this booking?
						</p>
						<div className="mt-4 d-flex justify-content-center">
							<Button
								className="mx-3"
								onClick={() => {
									setValue('isModal', true)
									onClick && onClick()
								}}
							>
								Yes, proceed
							</Button>
							<Button
								className="mx-2"
								onClick={() => {
									setValue('isModal', false)
									setShow(false)
								}}
							>
								Review Appointments
							</Button>
						</div>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	)
}
