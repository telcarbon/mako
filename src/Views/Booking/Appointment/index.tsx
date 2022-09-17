import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { ifNullOrEmpty, restructureCities } from 'common/Util'
import {
	ContentHeader,
	Form,
	FormField,
	FormRadioGroup,
	FormSearchSelect,
	SubmitButton,
} from 'components'
import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import stateAndCitiesData from '../../../common/state_cities.json'
import { AppointmentOptions, IAppointment } from '../types'

export const Appointment = () => {
	const navigate = useNavigate()

	const validationSchema = Yup.object().shape({
		city: Yup.string().required('City is required').nullable(),
		appointment: Yup.number()
			.required('Please select an appointment')
			.nullable(),
	})

	const initialValues: IAppointment = {
		state: 'North Carolina',
		city: '',
		appointment: 0,
	}

	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: initialValues,
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
		navigate('select-branch')
	}
	const cityWatch: string = watch('city')
	const appointmentWatch: number = watch('appointment')

	const stateWatch: string = watch('state')
	const ifEmptyState = ifNullOrEmpty(stateWatch)

	const appointmentOptionComponent = (name: string, description: string) => (
		<div className="radio-card-wrap">
			<div className="d-flex justify-content-between">
				<strong>{name}</strong>
				<p>$0.00</p>
			</div>
			<p className="small">{description}</p>
		</div>
	)

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
											options={restructureCities(
												stateAndCitiesData,
												ifEmptyState,
												stateWatch
											)}
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
												{AppointmentOptions.map(
													(option, index) => (
														<Col lg={6}>
															<FormRadioGroup
																name={
																	'appointment'
																}
																register={
																	register
																}
																value={
																	option.value
																}
																key={index}
																radioClassName="radio-card"
																components={appointmentOptionComponent(
																	option.name,
																	option.description
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
