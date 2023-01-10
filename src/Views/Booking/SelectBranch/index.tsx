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
import { Alert, Badge, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from 'shared/config'
import { BookingContext } from '..'
import { mockPartner } from '../mockData'
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
		serviceCounters,
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
		const formValues = getValues()
		setPartnerInfo(formValues)
		const partner = formValues['partner']
		if (!isEmpty(partner)) {
			const selectedPartner: any = partnerArray?.filter(
				(item) => item?.id === partner
			)
			setPartnerDetail(selectedPartner[0])
		}
		navigate('../select-time')
	}

	const getPartnersRequest = () => {
		const servicesSelected = serviceCounters
			.map((m: { id: any }) => m?.id)
			.join(',')
		// FOR MOCK DATA
		// setPartnerArray(mockPartner)
		axios
			.get(
				// `${API_URL}/partners/?city=${appointmentInfo.city}&is_approved=true&is_verified=true&expand=type`,
				`${API_URL}/partners/?city=${appointmentInfo.city}&expand=partner_configuration.configuration_block_dates&expand=services.service&state=${appointmentInfo.state}&expand=type&is_approved=true&is_verified=true&is_bookable=true&service=${servicesSelected}&expand=partner_configuration.configuration.days`,
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

	const totalPrice = () =>
		serviceCounters.reduce((acc: any, obj: any) => {
			return acc + obj.price * obj.counter
		}, 0)

	const clinicOptionComponent = (
		index: number,
		name: string,
		description: string,
		type: string
	) => (
		<div key={index} className="radio-card-wrap location">
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
							{partnerArray?.length === 0 ? (
								<Alert className="mt-3">
									Sorry! There are no available pharmacies
									offering that service/test. Please go{' '}
									<Link className="link-secondary" to={'../'}>
										back
									</Link>{' '}
									and choose another city.
								</Alert>
							) : (
								<Row>
									<Col lg={12}>
										<FormField
											name="partner"
											useWrapper={false}
											className="d-block"
										>
											<Row className="pe-2">
												{partnerArray?.map(
													(item, index) =>
														item
															?.partner_configuration
															?.length ===
														0 ? null : (
															<Col
																key={index}
																lg={6}
															>
																<FormRadioGroup
																	name={
																		'partner'
																	}
																	register={
																		register
																	}
																	value={
																		item?.id
																	}
																	key={index}
																	radioClassName="radio-card"
																	components={clinicOptionComponent(
																		index,
																		item.name,
																		`${
																			item.street
																		}${
																			item.unit_floor_building ===
																			null
																				? ''
																				: ` ${item.unit_floor_building}`
																		}, ${
																			item.city
																		}, NC, ${
																			item.zip_code
																		}`,
																		item
																			.type
																			.name
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
							)}
						</div>
						<Row className="mb-5">
							<Col>
								<h5>Selected Tests and Services</h5>
								<Card className="border border-2 border-dark py-1 px-4 mt-3">
									<Table responsive className="test-table">
										<tbody>
											{serviceCounters?.map(
												(
													service: any,
													index: number
												) => (
													<tr key={index}>
														<td className="text-start">
															{service?.name}
														</td>
														<td className="text-end">
															${service?.price}
														</td>
													</tr>
												)
											)}
										</tbody>
										<tfoot className="fw-bold">
											<tr>
												<td className="border-0 text-start">
													Total
												</td>
												<td className="border-0 text-end">
													${parseFloat(totalPrice())}
												</td>
											</tr>
										</tfoot>
									</Table>
								</Card>
							</Col>
						</Row>
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
