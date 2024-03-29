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
	LoadingMaskWrap,
	SubmitButton,
} from 'components'
import { useContext, useEffect, useState } from 'react'
import {
	Alert,
	Badge,
	Card,
	Col,
	Container,
	Row,
	Spinner,
	Table,
} from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from 'shared/config'
import { BookingContext } from '..'
import { ServicesSummaryTable } from '../components/ServicesSummaryTable'
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
	const [isLoading, setIsLoading] = useState(false)

	const useFormInstance = useForm({
		defaultValues: partnerInfo,
	})

	let totalAmount = 0

	const servicesSummaryArray = () => {
		let id: number = 1
		return serviceCounters?.map((service: any, index: number) => {
			let content = []

			for (let i = 0; i < service.counter; i++) {
				content.push(
					<tr key={id}>
						<td className="text-start">{service?.name}</td>
						<td className="text-end">${service?.price}</td>
					</tr>
				)
				id++
			}
			totalAmount += parseFloat(service?.price) * service.counter
			return content
		})
	}

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

		return new Promise(() => {
			setTimeout(() => {
				navigate('../select-time')
			}, 500)
		})
	}

	const getPartnersRequest = () => {
		// FOR MOCK DATA
		// setPartnerArray(mockPartner)

		const servicesSelected = serviceCounters
			.map((m: { id: any }) => m?.id)
			.join(',')
		setIsLoading(true)
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
				setIsLoading(false)
			})
	}

	useEffect(() => {
		if (appointmentInfo.city) {
			getPartnersRequest()
		}
	}, [appointmentInfo.city])

	const clinicOptionComponent = (
		index: any,
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
							) : isLoading ? (
								<div className="text-center my-5 py-5">
									<Spinner
										animation="border"
										role="status"
										variant="secondary"
									>
										<span className="visually-hidden">
											Loading...
										</span>
									</Spinner>
								</div>
							) : (
								<>
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
																	lg={6}
																	key={index}
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
																		key={
																			index
																		}
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
									<Row className="mt-4 mb-5">
										<Col>
											<ServicesSummaryTable
												title="Selected Tests and Services"
												serviceCounters={
													serviceCounters
												}
											/>
										</Col>
									</Row>
								</>
							)}
						</div>
					</Col>
				</Row>
				<div className="footer w-75">
					<SubmitButton
						pending={isSubmitting}
						pendingText="Saving"
						className="col-lg-auto pull-right"
						disabled={partner === 0 || isLoading}
					>
						Next
					</SubmitButton>
				</div>
			</Form>
			{isSubmitting && <LoadingMaskWrap />}
		</Container>
	)
}
