import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { UserContext } from 'App'
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
import stateAndCitiesData from '../../../common/state_cities.json'
import { AppointmentOptions, IAppointment, IServicesPricing } from '../types'

export const Appointment = () => {
	const navigate = useNavigate()

	const { appointmentInfo, setAppointmentInfo, headers } =
		useContext(BookingContext)
	const [services, setServices] = useState<IServicesPricing[]>()
	const [availableCity, setAvailableCity] = useState<any[]>()
	const { accessToken } = useContext(UserContext)

	const validationSchema = Yup.object().shape({
		city: Yup.string().required('City is required').nullable(),
		appointment: Yup.number()
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
	} = useFormInstance
	const handleSubmit = async (values: any) => {
		console.log(getValues())
		const formValues = getValues()
		setAppointmentInfo(formValues)
		navigate('select-branch')
	}
	const cityWatch: string = watch('city')
	const appointmentWatch: number = watch('appointment')

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
				`${API_URL}/partners/?city=${cityWatch}&expand=services.service`,
				{
					headers,
				}
			)
			.then((response) => {
				if (response.data.count > 0) {
					const serve = response.data.results[0].services.map(
						(m: any) => ({
							id: m.service.id,
							name: m.service.name,
							price: m.price,
							duration: m.service.duration,
						})
					)
					setServices(serve)
				}
			})
	}

	console.log(cityWatch, 'city')
	console.log(availableCity, 'city avail')

	useEffect(() => {
		if (!isEmpty(stateWatch)) {
			getCitiesRequest()
		}
	}, [stateWatch])

	useEffect(() => {
		if (!isEmpty(stateWatch)) {
			getServicesRequest()
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
											name="appointment"
											useWrapper={false}
										>
											<Row className="pe-2">
												{services?.map((item) => (
													<Col lg={6}>
														<FormRadioGroup
															name={'appointment'}
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
							disabled={appointmentWatch === 0}
						>
							Next
						</SubmitButton>
					</div>
				)}
			</Form>
		</Container>
	)
}
