import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { checkIfLegalAge, getStartAndEndTime, isEmpty } from 'common/Util'
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
import { useContext } from 'react'
import { Col, Container, Form as BootstrapForm, Row } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from 'shared/config'
import * as Yup from 'yup'
import { BookingContext } from '..'
import { AppointmentDetailsCard } from '../components/AppointmentDetailsCard'
import { genderOptions, ServicesRadioOptions } from '../types'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'

export const ConfirmAppointment = () => {
	const {
		headers,
		handleSubmitAll,
		setBookingId,
		serviceDetail,
		partnerDetail,
		bookingTime,
		bookingDate,
	} = useContext(BookingContext)
	const navigate = useNavigate()

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
		howDidYouHearAboutThisService: Yup.string()
			.required('Please select an option')
			.nullable(),
		guardiansFirstName: Yup.string().when('birthdate', {
			is: (value: number) => checkIfLegalAge(value) === false,
			then: Yup.string()
				.required("Guardian's First Name is required")
				.nullable(),
		}),
		guardiansLastName: Yup.string().when('birthdate', {
			is: (value: number) => checkIfLegalAge(value) === false,
			then: Yup.string()
				.required("Guardian's Last Name is required")
				.nullable(),
		}),
		other: Yup.string().when('howDidYouHearAboutThisService', {
			is: (value: string) => value === 'Other',
			then: Yup.string().required('This is required.').nullable(),
		}),
	})

	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			firstName: '',
			lastName: '',
			middleName: '',
			gender: '',
			birthdate: '',
			email: '',
			phoneNumber: '',
			guardiansFirstName: '',
			guardiansLastName: '',
			patientPhoto: '',
			terms: false,
			couponCode: '',
			howDidYouHearAboutThisService: '',
		},
	})

	const {
		getValues,
		register,
		formState: { isDirty, isSubmitting, isValid },
		watch,
		control,
	} = useFormInstance

	const birthdayWatch = watch('birthdate')

	const handleSubmit = async () => {
		const formValues = getValues()
		handleSubmitAll(formValues)
		return new Promise(() => {
			setTimeout(() => {
				navigate(`/booking/details`)
			}, 1000)
		})
	}

	console.log(partnerDetail, 'partner')

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
					<Col lg={8}>
						<AppointmentDetailsCard
							title="Appointment Details"
							service={serviceDetail?.name}
							price={serviceDetail?.price}
							// description={'This is a sample description'}
							partner={partnerDetail?.name}
							// partner={`${partnerDetail?.name} - ${partnerDetail?.type?.name}`}
							location={[
								partnerDetail?.unit_floor_building,
								partnerDetail?.street,
								partnerDetail?.city,
								partnerDetail?.state,
							].join(', ')}
							time={getStartAndEndTime(
								bookingTime,
								serviceDetail?.duration
							)}
							date={moment(bookingDate).format(
								'dddd, MMMM DD, YYYY'
							)}
						/>
						<div className="mt-5">
							<h5 className="mb-4">Patient Details</h5>
							<Row>
								<Col lg={2}>
									<FormField name="patientPhoto">
										<FormFileUpload
											name="patientPhoto"
											register={register}
											value={getValues('patientPhoto')}
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
													placeholder="MM/DD/YYYY"
													name="birthdate"
													register={register}
													type="date"
												/>
											</FormField>
										</Col>
									</Row>
									<Row>
										{!isEmpty(birthdayWatch) ? (
											<>
												<Col lg className="mt-2">
													{!checkIfLegalAge(
														birthdayWatch
													) && (
														<>
															<h6>
																Guardian's
																Details
															</h6>
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
																			className="invisible"
																		/>
																	</FormField>
																</Col>
															</Row>
														</>
													)}

													<Row>
														<Col lg>
															<FormField name="email">
																<FormTextInput
																	placeholder={`${
																		!checkIfLegalAge(
																			birthdayWatch
																		)
																			? "Guardian's "
																			: ''
																	}Email Address`}
																	name="email"
																	register={
																		register
																	}
																/>
															</FormField>
														</Col>
														<Col lg>
															<FormField
																name="phoneNumber"
																className="form-group"
															>
																<Controller
																	control={
																		control
																	}
																	name="phoneNumber"
																	render={({
																		field: {
																			onChange,
																			value,
																		},
																	}) => (
																		<PhoneInput
																			international={
																				false
																			}
																			placeholder={`${
																				!checkIfLegalAge(
																					birthdayWatch
																				)
																					? "Guardian's "
																					: ''
																			} Phone Number`}
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
												<FormField name="couponCode">
													<FormTextInput
														placeholder="Coupon Code (Optional)"
														name="couponCode"
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
								name="howDidYouHearAboutThisService"
								label="How did you hear about this service?"
								className="mb-0"
							>
								{ServicesRadioOptions.map((option, index) => (
									<FormRadioGroup
										name={'howDidYouHearAboutThisService'}
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
							{watch('howDidYouHearAboutThisService') ===
								'Other' && (
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
