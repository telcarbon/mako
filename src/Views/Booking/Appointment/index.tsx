import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { ifNullOrEmpty, isEmpty, restructureCities } from 'common/Util'
import {
	ContentHeader,
	Form,
	FormField,
	FormRadioGroup,
	FormSearchSelect,
	SubmitButton,
} from 'components'
import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { API_URL, TOKEN } from 'shared/config'
import * as Yup from 'yup'
import { BookingContext } from '..'
import { AppointmentOptions, IAppointment, IServicesPricing } from '../types'

export const Appointment = () => {
	const navigate = useNavigate()

	const {
		appointmentInfo,
		setAppointmentInfo,
		headers,
		serviceDetail,
		setServiceDetail,
	} = useContext(BookingContext)
	const [services, setServices] = useState<IServicesPricing[]>()
	const [availableCity, setAvailableCity] = useState<any[]>()

	const validationSchema = Yup.object().shape({
		city: Yup.string().required('City is required').nullable(),
		service: Yup.number()
			.required('Please select an appointment')
			.nullable(),
	})

	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: appointmentInfo,
	})

	const {
		getValues,
		register,
		formState: { isDirty, isSubmitting, isValid },
		watch,
		control,
		setValue,
	} = useFormInstance
	const handleSubmit = async () => {
		console.log(getValues())
		const formValues = getValues()
		setAppointmentInfo(formValues)

		const serv = formValues['service']
		if (!isEmpty(serv)) {
			const selectedService: any = services?.filter(
				(item) => item?.id === serv
			)
			setServiceDetail(selectedService[0])
		}
		navigate('select-branch')
	}
	const cityWatch: string = watch('city')
	const service: number = watch('service')

	const stateWatch: string = watch('state')
	const ifEmptyState = ifNullOrEmpty(stateWatch)

	const appointmentOptionComponent = (
		name: string,
		price: string
		// description: string
	) => (
		<div className="radio-card-wrap">
			<div className="d-flex justify-content-between">
				<strong>{name}</strong>
				<p>${price}</p>
			</div>
			{/* {description && <p className="small">{description}</p>} */}
		</div>
	)

	const getCitiesRequest = () => {
		axios
			.get(
				`${API_URL}/partners/get_all_partner_cities/?state=${stateWatch}`,
				{
					headers,
				}
			)
			.then((response) => {
				if (response.data.cities.length > 0) {
					const cities = response.data.cities.map(
						(m: any, k: any) => ({
							value: m,
							label: m,
						})
					)
					setAvailableCity(cities)
				}
			})
	}

	const getServicesRequest = () => {
		axios
			.get(
				// `${API_URL}/partners/?city=${cityWatch}&expand=services.service`,
				// `${API_URL}/partners/?city=${cityWatch}&expand=services.service&expand=type&is_approved=true&is_verified=true`,
				`${API_URL}/service-pricings/?state=${stateWatch}&expand=service`,
				{
					headers,
				}
			)
			.then((response) => {
				if (response.data.count > 0) {
					const serviceType = response.data.results.map(
						(item: any) => ({
							id: item.service.id,
							name: item.service.name,
							price: item.price,
							duration: item.service.duration,
						})
					)
					setServices(serviceType)
				}
			})
	}

	useEffect(() => {
		if (!isEmpty(stateWatch)) {
			getCitiesRequest()
		}
	}, [stateWatch])

	useEffect(() => {
		if (!isEmpty(cityWatch)) {
			getServicesRequest()
		}

		if (isDirty) {
			setValue('service', null)
		}
	}, [cityWatch])

	return (
		<Container fluid>
			<ContentHeader title="Book an Appointment" />
			<Form useFormInstance={useFormInstance} onSubmit={handleSubmit}>
				<Row className="justify-content-center">
					<Col lg={10}>
						<div className="bg-primary p-4 pb-2">
							<h5>Select location</h5>
							<p className="mb-3">
								<FontAwesomeIcon
									icon={faCircleExclamation}
									className="text-secondary me-2"
									size="1x"
								/>
								Our service is only available in{' '}
								<strong>North Carolina</strong> as of now.
							</p>
							<Row>
								<Col lg>
									<FormField name="state">
										<FormSearchSelect
											name="state"
											register={register}
											options={[
												{
													label: 'North Carolina',
													value: 'North Carolina',
												},
											]}
											defaultValue={{
												label: 'North Carolina',
												value: 'North Carolina',
											}}
											placeholder={'State'}
											isClearable={false}
										/>
									</FormField>
								</Col>
								<Col lg>
									<FormField name="city">
										<FormSearchSelect
											name="city"
											register={register}
											placeholder="City"
											options={availableCity ?? []}
											control={control}
										/>
									</FormField>
								</Col>
							</Row>
						</div>
						{cityWatch && (
							<div className="my-4">
								<h5>Select an appointment</h5>
								<Row>
									<Col lg={12}>
										<FormField
											name="service"
											useWrapper={false}
										>
											<Row className="pe-2">
												{services?.map((item) => (
													<Col lg={6}>
														<FormRadioGroup
															name={'service'}
															register={register}
															value={item.id}
															key={item?.id}
															radioClassName="radio-card"
															components={appointmentOptionComponent(
																item.name,
																item.price
															)}
															labelClassname="d-block mt-2 mb-3"
														/>
													</Col>
												))}
											</Row>
										</FormField>
									</Col>
								</Row>
							</div>
						)}
					</Col>
				</Row>
				{cityWatch && (
					<div className="footer w-75">
						<SubmitButton
							pending={isSubmitting}
							pendingText="Saving"
							className="col-lg-auto pull-right"
							disabled={service === 0 || service === null}
						>
							Next
						</SubmitButton>
					</div>
				)}
			</Form>
		</Container>
	)
}
