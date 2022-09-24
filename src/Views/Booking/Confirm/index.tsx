import {
	ContentHeader,
	Form,
	FormCheckBox,
	FormField,
	FormFileUpload,
	FormRadioGroup,
	FormSearchSelect,
	FormTextInput,
	SubmitButton,
} from 'components'
import { Col, Container, Row } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { Form as BootstrapForm } from 'react-bootstrap'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { AppointmentDetailsCard } from '../components/AppointmentDetailsCard'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import {
	genderOptions,
	IConfirmAppointment,
	ServicesRadioOptions,
} from '../types'
import { BASE_URL } from 'shared/config'
import { checkIfLegalAge, isEmpty } from 'common/Util'
import { useEffect, useState } from 'react'

export const ConfirmAppointment = () => {
	const navigate = useNavigate()
	const [age, setAge] = useState<boolean>(false)

	const validationSchema = Yup.object().shape({
		firstName: Yup.string().required('First Name is required').nullable(),
		lastName: Yup.string().required('Last Name is required').nullable(),
		gender: Yup.string().required('Gender is required').nullable(),
		birthdate: Yup.string().required('Birthday is required').nullable(),
		phoneNumber: Yup.string()
			.required('Phone Number is required')
			.test({
				test: (value) => (!value ? true : isValidPhoneNumber(value)),
				message: 'Enter a valid mobile phone number',
			}),
		email: Yup.string()
			.required('Email address is required')
			.email('Must be a valid email address'),
		services: Yup.string().required('Please select an option').nullable(),
	})

	const initialValues: IConfirmAppointment = {
		firstName: '',
		lastName: '',
		services: '',
		middleName: '',
		gender: '',
		birthdate: '',
		email: '',
		phoneNumber: '',
		guardiansPhoneNumber: '',
		guardiansEmail: '',
		guardiansFirstName: '',
		guardiansLastName: '',
		photo: '',
		terms: false,
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
		trigger,
		getFieldState,
	} = useFormInstance

	const birthdayWatch = watch('birthdate')

	if (checkIfLegalAge(birthdayWatch)) {
		console.log('i am legal')
	}

	const handleSubmit = async (values: any) => {
		console.log('test', getValues())
		const val = getValues()
		console.log('test', checkIfLegalAge(val.birthdate))
		navigate('/booking/details')
	}
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		console.log(event.key)
	}

	return (
		<Container fluid>
			<ContentHeader
				title="Confirm Appointment"
				backText="Back"
				backLink={-1}
			/>
			<Form useFormInstance={useFormInstance} onSubmit={handleSubmit}>
				<Row className="justify-content-center">
					<Col lg={10}>
						<div className="bg-primary p-4">
							<FontAwesomeIcon
								icon={faCircleExclamation}
								className="text-secondary me-2"
								size="1x"
							/>
							<span>
								You have <strong>5 minutes</strong> to complete
								and submit this form. Failure to do so will
								release your chosen time slots.
							</span>
						</div>
					</Col>
				</Row>
				<Row className="my-5 justify-content-center">
					<Col lg={7}>
						<AppointmentDetailsCard
							title="Appointment Details"
							service={'Flu Test'}
							price={'0.00'}
							description={'This is a sample description'}
							location={'Clinic A'}
							time={'9:30 AM - 10:00 AM '}
							date={'Wednesday, June 23, 2022'}
						/>
						<div className="mt-5">
							<h5 className="mb-4">Patient Details</h5>
							<Row>
								<Col lg={2}>
									<FormField name="photo">
										<FormFileUpload
											name="photo"
											register={register}
											value={getValues('photo')}
											hasPhotoPreview
										/>
									</FormField>
								</Col>
								<Col lg={10}>
									<Row>
										<Col lg>
											<FormField name="firstName">
												<FormTextInput
													placeholder="First Name"
													name="firstName"
													register={register}
												/>
											</FormField>
											<FormField name="middleName">
												<FormTextInput
													placeholder="Middle Name"
													name="middleName"
													register={register}
												/>
											</FormField>
										</Col>
										<Col lg>
											<FormField name="lastName">
												<FormTextInput
													placeholder="Last Name"
													name="lastName"
													register={register}
												/>
											</FormField>
										</Col>
									</Row>
									<Row className="mt-4">
										<Col lg>
											<FormField name="gender">
												<FormSearchSelect
													name="gender"
													register={register}
													placeholder="Gender"
													control={control}
													options={genderOptions}
												/>
											</FormField>
										</Col>
										<Col lg>
											<FormField name="birthdate">
												<FormTextInput
													placeholder="Birthday"
													name="birthdate"
													register={register}
													type="date"
												/>
											</FormField>
										</Col>
									</Row>
									<Row>
										{checkIfLegalAge(birthdayWatch) ? (
											<>
												<Col lg>
													<FormField name="email">
														<FormTextInput
															placeholder="Email Address"
															name="email"
															register={register}
														/>
													</FormField>
												</Col>
												<Col lg>
													<FormField
														name="phoneNumber"
														className="form-group"
													>
														<Controller
															control={control}
															name="phoneNumber"
															render={({
																field: {
																	onChange,
																	value,
																},
															}) => (
																<PhoneInput
																	international
																	placeholder="Enter phone number"
																	value={
																		value
																	}
																	onChange={
																		onChange
																	}
																	defaultCountry="US"
																	inputComponent={
																		BootstrapForm.Control as any
																	}
																	countries={[
																		'US',
																	]}
																	addInternationalOption={
																		false
																	}
																/>
															)}
														/>
													</FormField>
												</Col>
											</>
										) : !checkIfLegalAge(birthdayWatch) &&
										  !isEmpty(birthdayWatch) ? (
											<>
												<Col lg className="mt-2">
													<h6>Guardian's Details</h6>
													<Row>
														<Col lg>
															<FormField name="guardiansFirstName">
																<FormTextInput
																	placeholder="Guardian's First Name"
																	name="guardiansFirstName"
																	register={
																		register
																	}
																/>
															</FormField>
														</Col>
														<Col lg>
															<FormField name="guardiansLastName">
																<FormTextInput
																	placeholder="Guardian's Last Name"
																	name="guardiansLastName"
																	register={
																		register
																	}
																/>
															</FormField>
														</Col>
													</Row>
													<Row>
														<Col lg>
															<FormField name="guardiansEmail">
																<FormTextInput
																	placeholder="Guardian's Email Address"
																	name="guardiansEmail"
																	register={
																		register
																	}
																/>
															</FormField>
														</Col>
														<Col lg>
															<FormField
																name="guardiansPhoneNumber"
																className="form-group"
															>
																<Controller
																	control={
																		control
																	}
																	name="guardiansPhoneNumber"
																	render={({
																		field: {
																			onChange,
																			value,
																		},
																	}) => (
																		<PhoneInput
																			international
																			placeholder="Guardian’s Mobile Number"
																			value={
																				value
																			}
																			onChange={
																				onChange
																			}
																			defaultCountry="US"
																			inputComponent={
																				BootstrapForm.Control as any
																			}
																			countries={[
																				'US',
																			]}
																			addInternationalOption={
																				false
																			}
																		/>
																	)}
																/>
															</FormField>
														</Col>
													</Row>
												</Col>
											</>
										) : null}
									</Row>
									{!isEmpty(birthdayWatch) && (
										<Row className="mt-4">
											<Col lg={6}>
												<FormField name="coupon">
													<FormTextInput
														placeholder="Coupon Code (Optional)"
														name="coupon"
														register={register}
													/>
												</FormField>
											</Col>
										</Row>
									)}
								</Col>
							</Row>
						</div>
						<div className="mt-5 mx-1">
							<FormField
								name="services"
								label="How did you hear about this service?"
								className="mb-0"
							>
								{ServicesRadioOptions.map((option, index) => (
									<FormRadioGroup
										name={'services'}
										register={register}
										value={option.label}
										key={index}
										labelClassname="d-flex mb-2"
										className="radio-default me-3 ms-2"
									>
										{option.label}
									</FormRadioGroup>
								))}
							</FormField>
							{watch('services') === 'Other' && (
								<FormField
									name="other"
									className="col-lg-5 ms-4 ps-3"
								>
									<FormTextInput
										placeholder="Other"
										name="other"
										register={register}
									/>
								</FormField>
							)}
						</div>

						<div className="text-center mt-5">
							<FormField name="terms">
								<FormCheckBox
									name="terms"
									register={register}
									value={'termsOfUse'}
								>
									I agree with the{' '}
									<a
										className="link-secondary"
										href={`${BASE_URL}/static/pdf/MakoRx_CareConnect_CareCheckIn_Terms_of_Use_8.9.22.pdf`}
										target="_blank"
									>
										Terms and Conditions
									</a>
									.
								</FormCheckBox>
							</FormField>
						</div>
					</Col>
				</Row>
				<div className="footer w-75">
					<SubmitButton
						pending={false}
						pendingText="Saving"
						className="col-lg-auto pull-right"
					>
						Next
					</SubmitButton>
				</div>
			</Form>
		</Container>
	)
}
