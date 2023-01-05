import {
	faCircleExclamation,
	faMinus,
	faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { isEmpty } from 'common/Util'
import {
	ContentHeader,
	Form,
	FormCheckBox,
	FormField,
	FormRadioGroup,
	FormSearchSelect,
	LoadingMaskWrap,
	SubmitButton,
} from 'components'
import { any } from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { API_URL, TOKEN } from 'shared/config'
import * as Yup from 'yup'
import { BookingContext } from '..'
import { AppointmentOptions } from '../mockData'
import { IAppointment, IServicesPricing } from '../types'
import {
	addMinusCounter,
	filterCounterEqualToId,
	filterCounterNotEqualToId,
	findCounterById,
} from './counters'

export const Appointment = () => {
	const navigate = useNavigate()

	const {
		appointmentInfo,
		setAppointmentInfo,
		headers,
		serviceDetail,
		setServiceDetail,
		serviceCounters,
		setServiceCounters,
	} = useContext(BookingContext)

	const [services, setServices] = useState<IServicesPricing[]>()
	const [availableCity, setAvailableCity] = useState<any[]>()
	const [isLoading, setIsLoading] = useState(false)

	const validationSchema = Yup.object().shape({
		city: Yup.string().required('City is required').nullable(),
		service: Yup.number()
			.required('Please select an appointment')
			.nullable(),
		// multiServices: Yup.array().required('Please select 1 or more appointments').nullable(),
	})

	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: appointmentInfo,
	})

	const {
		getValues,
		register,
		formState: { isDirty, isSubmitting },
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

	const watchMultiServices = watch('multiServices')

	console.log(watchMultiServices, 'watchMultiServices')

	const appointmentOptionComponent = (
		id: number,
		name: string,
		price: string
		// description: string
	) => (
		<div className="radio-card-wrap" key={id}>
			<div className="d-flex justify-content-between">
				<strong>{name}</strong>
				<p>${price}</p>
			</div>
			{/* {description && <p className="small">{description}</p>} */}
		</div>
	)

	const appointmentOptionComponents = (
		name: string,
		price: string,
		id: number
	) => {
		const notSelected =
			filterCounterEqualToId(id, serviceCounters).length === 0

		return (
			<div className="checkbox-card">
				<div className="checkbox-card-wrap" key={id}>
					<div className="d-flex justify-content-between">
						<strong>{name}</strong>
						<p>${price}</p>
					</div>
					<div
						className={`d-flex justify-content-end ${
							notSelected && 'd-none'
						}`}
					>
						<button
							type="button"
							onClick={() => {
								addMinusCounter(
									id,
									serviceCounters,
									setServiceCounters,
									false,
									watchMultiServices,
									setValue
								)
							}}
						>
							<FontAwesomeIcon icon={faMinus} size="1x" />
						</button>
						<span className="counter-display">
							{notSelected
								? ''
								: findCounterById(id, serviceCounters).counter}
						</span>
						<button
							type="button"
							onClick={() =>
								addMinusCounter(
									id,
									serviceCounters,
									setServiceCounters,
									true
								)
							}
						>
							<FontAwesomeIcon icon={faPlus} size="1x" />
						</button>
					</div>
				</div>
			</div>
		)
	}

	const getCitiesRequest = () => {
		// FOR MOCK DATA
		// setAvailableCity([
		// 	{
		// 		label: 'North Carolina',
		// 		value: 'North Carolina',
		// 	},
		// ])
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
		// FOR MOCK DATA
		//setServices(AppointmentOptions)

		setIsLoading(true)
		axios
			.get(
				`${API_URL}/service-pricings/?state=${stateWatch}&expand=service&city=${cityWatch}`,
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
				} else {
					setServices([])
				}
				setTimeout(() => {
					setIsLoading(false)
				}, 250)
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

	const manageCounter = (e: any, id: any, name: string, price: string) => {
		let ctr = []
		if (e.target['checked']) {
			ctr.push(...serviceCounters, {
				id,
				counter: 1,
				name,
				price,
			})
		} else {
			ctr =
				serviceCounters.length !== 0
					? filterCounterNotEqualToId(id, serviceCounters)
					: []
		}
		setServiceCounters(ctr)
	}

	return (
		<Container fluid>
			<ContentHeader title="Book an Appointment" />
			<Form useFormInstance={useFormInstance} onSubmit={handleSubmit}>
				<Row className="justify-content-center">
					<Col lg={10}>
						<div className="bg-primary p-4 pb-2">
							<p className="fw-bold mb-5 small text-center">
								Your local pharmacy + MakoRx Care Connect work
								together to provide you special services and
								testing. <br /> Get started by selecting your
								state/city below.
							</p>
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
											setValue={setValue}
											setServiceCounters={
												setServiceCounters
											}
										/>
									</FormField>
								</Col>
							</Row>
						</div>

						{cityWatch && (
							<div className="my-4">
								{isLoading ? (
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
								) : // <LoadingMaskWrap />
								services?.length !== 0 ? (
									<>
										<h5>Select an appointment</h5>
										<Row>
											<Col lg={12}>
												<FormField
													name="service"
													useWrapper={false}
												>
													<Row className="pe-2">
														{services?.map(
															(item) => (
																<Col
																	lg={6}
																	key={
																		item.id
																	}
																>
																	<FormRadioGroup
																		name={
																			'service'
																		}
																		register={
																			register
																		}
																		value={
																			item.id
																		}
																		key={
																			item?.id
																		}
																		radioClassName="radio-card"
																		components={appointmentOptionComponent(
																			item.id,
																			item.name,
																			item.price
																		)}
																		labelClassname="d-block mt-2 mb-3"
																	/>
																</Col>
															)
														)}
													</Row>
												</FormField>

												<FormField
													name="multiServices"
													useWrapper={false}
												>
													<Row className="pe-2">
														{services?.map(
															(item) => (
																<Col
																	lg={6}
																	key={
																		item.id
																	}
																>
																	<FormCheckBox
																		name="multiServices"
																		register={
																			register
																		}
																		value={
																			item
																		}
																		key={
																			item?.id
																		}
																		className="ps-0"
																		checkClassName="checkbox-custom"
																		labelClassname="d-block mt-2 mb-3"
																		components={appointmentOptionComponents(
																			item.name,
																			item.price,
																			item.id
																		)}
																		manageCounter={
																			manageCounter
																		}
																	/>
																</Col>
															)
														)}
													</Row>
												</FormField>
											</Col>
										</Row>
									</>
								) : (
									<p className="fw-bold text-center mt-5 pt-4">
										Sorry, it looks like there are no
										available services in your area. <br />
										Please select another location.
									</p>
								)}
							</div>
						)}					
					</Col>
				</Row>
				{cityWatch && services?.length !== 0 && !isLoading && (
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
