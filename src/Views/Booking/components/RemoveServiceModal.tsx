import { Button } from 'components'
import { Col, Modal, Row } from 'react-bootstrap'

interface RemoveServiceModalProps {
	show: boolean
	setShow: (show: boolean) => void
	onClick?: () => void;
}

export const RemoveServiceModal = ({
	show,
	setShow,
	onClick
}: RemoveServiceModalProps) => {
	return (
		<Modal
			show={show}
			onHide={() => setShow(false)}
			centered
			// size={'lg'}
			backdrop="static"
		>
			{/* <Modal.Header closeButton>
				<Modal.Title className="h6">
					Please select an option
				</Modal.Title>
			</Modal.Header> */}
			<Modal.Body>
				<Row className="d-flex justify-content-center my-4">
					<Col>
						<h5 className="text-center fw-light">
							Are you sure you want to remove this test or
							service?
						</h5>
						<div className="mt-5 d-flex justify-content-center">
							<Button className="mx-3" onClick={onClick}>
								Yes, remove
							</Button>
							<Button
								className="mx-2"
								onClick={() => setShow(false)}
							>
								No
							</Button>
						</div>
					</Col>
				</Row>
			</Modal.Body>
		</Modal>
	)
}
