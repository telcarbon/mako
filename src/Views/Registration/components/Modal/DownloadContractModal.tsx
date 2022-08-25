import { faDownload, faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Modal } from 'react-bootstrap'
import { BASE_URL } from 'shared/config'

interface DownloadContractModalProps {
	show: boolean
	setShow: (show: boolean) => void
}

export const DownloadContractModal = ({
	show,
	setShow,
}: DownloadContractModalProps) => {
	return (
		<Modal show={show} onHide={() => setShow(false)} centered>
			<Modal.Header closeButton>
				<Modal.Title className="h6">
					Please select an option
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className='d-flex justify-content-center my-4'>
					<a
						className="rounded-pill btn btn-primary mx-2"
						href={`${BASE_URL}/static/pdf/MakoRx_Pharmacy_Agreement_CommericalRetail_CommercialSpecialty_LoyaltyCard_Tablet_PointOfCareTesting.pdf`}
						target="_blank"
					>
						<FontAwesomeIcon icon={faEye} className="me-2" />
						View
					</a>
					<a
						className="rounded-pill btn btn-secondary mx-2"
						href={`${BASE_URL}/static/pdf/MakoRx_Pharmacy_Agreement_CommericalRetail_CommercialSpecialty_LoyaltyCard_Tablet_PointOfCareTesting.docx`}
						download
					>
						<FontAwesomeIcon icon={faDownload} className="me-2" />
						Download
					</a>
				</div>
			</Modal.Body>
		</Modal>
	)
}
