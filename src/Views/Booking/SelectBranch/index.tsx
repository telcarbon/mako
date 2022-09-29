import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { isEmpty } from 'common/Util'
import {
	ContentHeader,
	Form,
	FormField,
	FormRadioGroup,
	SubmitButton,
} from 'components'
import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { API_URL } from 'shared/config'
import { BookingContext } from '..'
import { IPartners } from '../types'

export const SelectBranch = () => {
	const navigate = useNavigate()

	const { appointmentInfo, setPartnerInfo, partnerInfo, headers } =
		useContext(BookingContext)

	const [partnerArray, setPartnerArray] = useState<IPartners[]>()

	const useFormInstance = useForm({
		defaultValues: partnerInfo,
	})

	const {
		getValues,
		register,
		formState: { isDirty, isSubmitting, isValid },
		watch,
		control,
	} = useFormInstance
	const handleSubmit = async (values: any) => {
		console.log(getValues())
		const formValues = getValues()
		setPartnerInfo(formValues)
		navigate('/booking/select-time')
	}

	const getPartnersRequest = () => {
		axios
			.get(`${API_URL}/partners/?city=${appointmentInfo.city}`, {
				headers,
			})
			.then((response) => {
				setPartnerArray(response.data.results)
			})
	}

	useEffect(() => {
		if (appointmentInfo.city) {
			getPartnersRequest()
		}
	}, [appointmentInfo.city])

	const clinicOptionComponent = (name: string, description: string) => (
		<div className="radio-card-wrap location">
			<div className="d-flex justify-content-between">
				<div>
					<FontAwesomeIcon
						icon={faLocationDot}
						className="text-secondary me-2"
						size="1x"
					/>
					<strong>{name}</strong>
				</div>

				<p className="select-text">SELECT</p>
			</div>
			<p className="small">{description}</p>
		</div>
	)

	return (
		<Container fluid>
			<ContentHeader
				title="Select Branch"
				backText="Back"
				backLink={-1}
			/>
			<Form useFormInstance={useFormInstance} onSubmit={handleSubmit}>
				<Row className="justify-content-center">
					<Col lg={10}>
						<div className="my-4">
							<h5>Available Clinics</h5>
							<Row>
								<Col lg={12}>
									<FormField
										name="partner"
										useWrapper={false}
										className="d-block"
									>
										<Row className="pe-2">
											{partnerArray?.map((item, index) =>
												item?.partner_configuration
													?.length === 0 ? null : (
													<Col lg={6}>
														<FormRadioGroup
															name={'partner'}
															register={register}
															value={item?.id}
															key={index}
															radioClassName="radio-card"
															components={clinicOptionComponent(
																item.name,
																[
																	item.unit_floor_building,
																	item.street,
																	item.city,
																	item.state,
																].join(', ')
															)}
															labelClassname="d-block mt-2 mb-3"
														/>
													</Col>
												)
											)}
										</Row>
									</FormField>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>

				<div className="footer w-75">
					<SubmitButton
						pending={isSubmitting}
						pendingText="Saving"
						className="col-lg-auto pull-right"
						disabled={(!isDirty && !isValid) || isSubmitting}
					>
						Next
					</SubmitButton>
				</div>
			</Form>
		</Container>
	)
}
