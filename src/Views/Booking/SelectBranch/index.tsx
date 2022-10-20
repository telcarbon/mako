import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import classNames from 'classnames'
import { isEmpty } from 'common/Util'
import {
	ContentHeader,
	Form,
	FormField,
	FormRadioGroup,
	SubmitButton,
} from 'components'
import { useContext, useEffect, useState } from 'react'
import { Badge, Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { API_URL } from 'shared/config'
import { BookingContext } from '..'
import { IPartners } from '../types'

export const SelectBranch = () => {
	const navigate = useNavigate()

	const {
		appointmentInfo,
		setPartnerInfo,
		partnerInfo,
		headers,
		setPartnerDetail,
		partnerDetail,
		serviceDetail,
	} = useContext(BookingContext)

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

	const partner: number = watch('partner')

	const handleSubmit = async (values: any) => {
		console.log(getValues())
		const formValues = getValues()
		setPartnerInfo(formValues)
		const partner = formValues['partner']
		if (!isEmpty(partner)) {
			const selectedPartner: any = partnerArray?.filter(
				(item) => item?.id === partner
			)
			setPartnerDetail(selectedPartner[0])
		}
		navigate('/booking/select-time')
	}

	const getPartnersRequest = () => {
		axios
			.get(
				// `${API_URL}/partners/?city=${appointmentInfo.city}&is_approved=true&is_verified=true&expand=type`,
				`${API_URL}/partners/?city=${appointmentInfo.city}&expand=services.service&state=${appointmentInfo.state}&expand=type&is_approved=true&is_verified=true&service=${serviceDetail?.id}`,
				{
					headers,
				}
			)
			.then((response) => {
				setPartnerArray(response.data.results)
			})
	}

	useEffect(() => {
		if (appointmentInfo.city) {
			getPartnersRequest()
		}
	}, [appointmentInfo.city])

	const clinicOptionComponent = (
		name: string,
		description: string,
		type: string
	) => (
		<div className="radio-card-wrap location">
			<div className="d-flex justify-content-between">
				<div>
					<FontAwesomeIcon
						icon={faLocationDot}
						className="text-secondary me-2"
						size="1x"
					/>
					<strong className="me-2">{name}</strong>
					<Badge
						pill
						className={classNames({
							clinic: type === 'Clinic',
							mobile: type === 'Mobile Clinic',
							pharmacy: type === 'Pharmacy',
						})}
					>
						{type}
					</Badge>
				</div>

				<p className="select-text">SELECT</p>
			</div>
			<p className="small pb-5">{description}</p>
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
																].join(', '),
																item.type.name
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
						disabled={partner === 0}
					>
						Next
					</SubmitButton>
				</div>
			</Form>
		</Container>
	)
}
