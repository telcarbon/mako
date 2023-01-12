import { faCircleExclamation, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import {
	checkIfLegalAge,
	formatDate,
	getMinBookingTime,
	isEmpty,
} from 'common/Util'
import {
	Button,
	ContentHeader,
	Form,
	FormCheckBox,
	FormField,
	FormFileUpload,
	FormRadioGroup,
	FormSearchSelect,
	FormTextInput,
	LoadingMaskWrap,
	SubmitButton,
} from 'components'
import moment from 'moment'
import { useContext, useState } from 'react'
import {
	Alert,
	Col,
	Container,
	Form as BootstrapForm,
	Row,
} from 'react-bootstrap'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Controller, useForm, useFieldArray } from 'react-hook-form'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from 'shared/config'
import * as Yup from 'yup'
import { BookingContext } from '..'
import { genderOptions, ServicesRadioOptions } from '../types'

export const PatientInfo = () => {
	const [showBookingTimeError, setShowBookingTimeError] = useState(false)
	const { bookingTime, bookingDate } = useContext(BookingContext)
	const navigate = useNavigate()

	const { serviceCounters, bookingInfo } = useContext(BookingContext)

	const validationSchema = Yup.object().shape({
		others: Yup.string().when('howDidYouHearAboutThisService', {
			is: (value: string) => value === 'Other',
			then: Yup.string().required('This is required.').nullable(),
		}),
		howDidYouHearAboutThisService: Yup.string()
			.required('Please select an option')
			.nullable(),
		patient: Yup.array().of(
			Yup.object().shape({
				firstName: Yup.string()
					.required('First Name is required')
					.nullable(),
				lastName: Yup.string()
					.required('Last Name is required')
					.nullable(),
				gender: Yup.string().required('Gender is required').nullable(),
				birthdate: Yup.string()
					.required('Birthday is required')
					.nullable(),
				phoneNumber: Yup.string()
					.required('Phone Number is required')
					.test({
						test: (value) =>
							!value ? true : isValidPhoneNumber(value),
						message: 'Enter a valid mobile phone number',
					}),
				email: Yup.string()
					.required('Email address is required')
					.email('Must be a valid email address'),
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
			})
		),
	})

	const useFormInstance = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: {
			patient: [
				{
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
					couponCode: '',
				},
			],
			termsOfUse: false,
			consentToTreatment: false,
			couponCode: '',
			howDidYouHearAboutThisService: '',
			others: '',
		},
	})

	const {
		getValues,
		register,
		formState: { isSubmitting, isDirty },
		watch,
		control,
	} = useFormInstance

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'patient',
	})

	const handleAppend = (value: {
		firstName: string
		lastName: string
		middleName: string
		gender: string
		birthdate: string
		email: string
		phoneNumber: string
		guardiansFirstName: string
		guardiansLastName: string
		couponCode: ''
	}) => {
		append(value)
	}

	const checkIfPastTime = () => {
		const today = new Date()
		var todayMoment = formatDate(today)
		const currentTime = getMinBookingTime()

		let hasPassed = false
		if (bookingDate === todayMoment) {
			hasPassed = bookingTime <= currentTime
		}
		setShowBookingTimeError(hasPassed)
		return hasPassed
	}

	const handleSubmit = async () => {
		const formValues = getValues()
		const pastTime = checkIfPastTime()

		console.log(formValues, 'values')
	}

	const watchBirthday = (watchBirthdate: any) =>
		moment(watchBirthdate).format('YYYY-MM-DD')

	return (
		<Container fluid>
			<ContentHeader
				title="Enter Patient Details"
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
						<div>
							{fields.map((item, i) => {
								return (
									<div key={i}>
										<h5 className="mb-4">
											Patient # {i + 1}
										</h5>
										<Row>
											<Col lg={2}>
												{/* <FormField
													name={`patient[${i}].patientPhoto`}
												>
													<FormFileUpload
														name={`patient[${i}].patientPhoto`}
														register={register}
														value={getValues(item.patientPhoto)}
														hasPhotoPreview
													/>
												</FormField> */}
											</Col>
											<Col lg={10}>
												<Row>
													<Col lg>
														<FormField
															name={`patient[${i}].firstName`}
														>
															<FormTextInput
																placeholder="First Name"
																name={`patient[${i}].firstName`}
																register={
																	register
																}
															/>
														</FormField>
														<FormField
															name={`patient[${i}].middleName`}
														>
															<FormTextInput
																placeholder="Middle Name (Optional)"
																name={`patient[${i}].middleName`}
																register={
																	register
																}
															/>
														</FormField>
													</Col>
													<Col lg>
														<FormField
															name={`patient[${i}].lastName`}
														>
															<FormTextInput
																placeholder="Last Name"
																name={`patient[${i}].lastName`}
																register={
																	register
																}
															/>
														</FormField>
													</Col>
												</Row>
												<Row className="mt-4">
													<Col lg>
														<FormField
															name={`patient[${i}].gender`}
														>
															<FormSearchSelect
																name={`patient[${i}].gender`}
																register={
																	register
																}
																placeholder="Gender"
																control={
																	control
																}
																options={
																	genderOptions
																}
															/>
														</FormField>
													</Col>
													<Col lg>
														<FormField
															name={`patient[${i}].birthdate`}
														>
															<Controller
																control={
																	control
																}
																name={
																	`patient[${i}].birthdate` as any
																}
																render={({
																	field,
																}) => (
																	<ReactDatePicker
																		className="form-control rounded-right"
																		placeholderText="Birthday"
																		onChange={(
																			e: any
																		) =>
																			field.onChange(
																				e
																			)
																		}
																		selected={
																			field.value
																		}
																		maxDate={moment().toDate()}
																		dateFormat="MM/dd/yyyy"
																	/>
																)}
															/>
														</FormField>
													</Col>
												</Row>
												<Row>
													{!watchBirthday(
														watch(
															`patient[${i}].birthdate` as any
														)
													).includes('Invalid') ? (
														<>
															<Col
																lg
																className="mt-2"
															>
																{!checkIfLegalAge(
																	watchBirthday(
																		watch(
																			`patient[${i}].birthdate` as any
																		)
																	)
																) && (
																	<>
																		<h6>
																			Guardian's
																			Details
																		</h6>
																		<Row>
																			<Col
																				lg
																			>
																				<FormField
																					name={`patient[${i}].guardiansFirstName`}
																				>
																					<FormTextInput
																						placeholder="Guardian's First Name"
																						name={`patient[${i}].guardiansFirstName`}
																						register={
																							register
																						}
																					/>
																				</FormField>
																			</Col>
																			<Col
																				lg
																			>
																				<FormField
																					name={`patient[${i}].guardiansLastName`}
																				>
																					<FormTextInput
																						placeholder="Guardian's Last Name"
																						name={`patient[${i}].guardiansLastName`}
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
																		<FormField
																			name={`patient[${i}].email`}
																		>
																			<FormTextInput
																				placeholder={`${
																					!checkIfLegalAge(
																						watchBirthday(
																							watch(
																								`patient[${i}].birthdate` as any
																							)
																						)
																					)
																						? "Guardian's "
																						: ''
																				}Email Address`}
																				name={`patient[${i}].email`}
																				register={
																					register
																				}
																			/>
																		</FormField>
																	</Col>
																	<Col lg>
																		<FormField
																			name={`patient[${i}].phoneNumber`}
																			className="form-group"
																		>
																			<Controller
																				control={
																					control
																				}
																				name={
																					`patient[${i}].phoneNumber` as any
																				}
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
																								watchBirthday(
																									watch(
																										`patient[${i}].birthdate` as any
																									)
																								)
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
																<Row className="mt-4">
																	<Col lg={6}>
																		<FormField
																			name={`patient[${i}].couponCode`}
																		>
																			<FormTextInput
																				placeholder="Coupon Code (Optional)"
																				name={`patient[${i}].couponCode`}
																				register={
																					register
																				}
																			/>
																		</FormField>
																	</Col>
																</Row>
															</Col>
														</>
													) : null}
												</Row>
											</Col>
										</Row>
										<hr className="mb-5" />
									</div>
								)
							})}
							<button
								type="button"
								className="btn btn-outline-secondary rounded-pill"
								disabled={bookingInfo?.length === fields.length}
								onClick={() =>
									handleAppend({
										// patientPhoto: '',
										firstName: '',
										lastName: '',
										middleName: '',
										gender: '',
										birthdate: '',
										email: '',
										phoneNumber: '',
										guardiansFirstName: '',
										guardiansLastName: '',
										couponCode: '',
									})
								}
							>
								<FontAwesomeIcon
									icon={faPlus}
									className="pe-2"
								/>
								Add Patient
							</button>
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
									name="others"
									className="col-lg-5 ms-4 ps-3"
								>
									<FormTextInput
										placeholder="Other"
										name="others"
										register={register}
									/>
								</FormField>
							)}
						</div>
					</Col>
				</Row>
				<div className="footer w-75">
					<SubmitButton
						pending={isSubmitting}
						pendingText="Submitting"
						className="col-lg-auto pull-right"
						disabled={!isDirty}
					>
						Next
					</SubmitButton>
				</div>
			</Form>
			{isSubmitting && <LoadingMaskWrap />}
		</Container>
	)
}
